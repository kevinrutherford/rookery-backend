import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types'
import { Domain } from '../domain/domain'
import { Entry } from '../domain/entry-resource'
import { JsonApiErrorsDocument, JsonApiResource } from '../json-api/json-api-resource'
import { renderCollection } from '../json-api/render-collection'
import { renderComment } from '../json-api/render-comment'
import { renderEntry } from '../json-api/render-entry'
import { renderError } from '../json-api/render-error'
import { renderWork } from '../json-api/render-work'
import { Service } from '../service'
import { validateInput } from '../validate-input'

const includes = t.union([
  t.literal('collection'),
  t.literal('comments'),
  t.literal('work'),
])

type Includes = t.TypeOf<typeof includes>

const csv = new t.Type<ReadonlyArray<Includes>, string, unknown>(
  'CommaSeparatedValueCodec',
  (input): input is Array<Includes> => (
    Array.isArray(input)
    && input.every((value) => typeof value === 'string' && includes.is(value))
  ),
  (input, context) => pipe(
    t.string.validate(input, context),
    E.map((str) => str.split(',')),
    E.chain(E.traverseArray((v) => includes.validate(v, context))),
  ),
  (output: ReadonlyArray<Includes>) => output.join(','),
)

const paramsCodec = t.type({
  id: t.string,
  include: optionFromNullable(csv),
})

type Params = t.TypeOf<typeof paramsCodec>

const getInc = (
  queries: Domain,
  entry: Entry,
) => (opt: Includes): E.Either<JsonApiErrorsDocument, ReadonlyArray<JsonApiResource>> => {
  switch (opt) {
    case 'collection':
      return pipe(
        entry.collectionId,
        queries.lookupCollection,
        E.bimap(
          () => renderError('fatal-error', 'Collection associated with Entry not found!', {
            entryId: entry.id,
            collectionId: entry.collectionId,
          }),
          (c) => [renderCollection(c)],
        ),
      )
    case 'comments':
      return pipe(
        entry.id,
        queries.findComments,
        RA.map(renderComment),
        E.right,
      )
    case 'work':
      return pipe(
        entry.workId,
        queries.lookupWork,
        E.fromOption(() => renderError('fatal-error', 'Work associated with Entry not found!', {
          entryId: entry.id,
          workId: entry.workId,
        })),
        E.map(renderWork),
        E.map((work) => [work]),
      )
    default:
      return E.right([])
  }
}

const renderWithIncludes = (queries: Domain, incl: Params['include']) => (entry: Entry) => pipe(
  incl,
  O.matchW(
    () => E.right({
      data: renderEntry(entry),
    }),
    (incs) => pipe(
      incs,
      E.traverseArray(getInc(queries, entry)),
      E.map(RA.flatten),
      E.map((i) => ({
        data: renderEntry(entry),
        included: i,
      })),
    ),
  ),
)

const renderResult = (queries: Domain) => (params: Params) => pipe(
  params.id,
  queries.lookupEntry,
  E.fromOption(() => renderError('not-found', 'Entry not found', { id: params.id })),
  E.chain(renderWithIncludes(queries, params.include)),
)

export const getEntry = (queries: Domain): Service => () => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.chain(renderResult(queries)),
)

