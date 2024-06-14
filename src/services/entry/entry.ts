import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { Json, optionFromNullable } from 'io-ts-types'
import { Queries } from '../../unrestricted-domain'
import { Entry } from '../entry-resource'
import { renderCollection } from '../json-api/render-collection'
import { renderComment } from '../json-api/render-comment'
import { renderEntry } from '../json-api/render-entry'
import { renderWork } from '../json-api/render-work'
import { ErrorDocument, Service } from '../service'
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

const getInc = (queries: Queries, entry: Entry) => (opt: Includes): E.Either<ErrorDocument, ReadonlyArray<Json>> => {
  switch (opt) {
    case 'collection':
      return pipe(
        entry.collectionId,
        queries.lookupCollection,
        E.bimap(
          () => ({
            category: 'not-found' as const,
            message: 'Collection not found',
            evidence: entry,
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
        E.fromOption(() => ({
          category: 'not-found' as const,
          message: 'Could not find Work!',
          evidence: { entry },
        })),
        E.map(renderWork),
        E.map((work) => [work]),
      )
    default:
      return E.right([])
  }
}

const renderWithIncludes = (queries: Queries, incl: Params['include']) => (entry: Entry) => pipe(
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

const renderResult = (queries: Queries) => (params: Params) => pipe(
  params.id,
  queries.lookupEntry,
  E.fromOption(() => ({
    category: 'not-found' as const,
    message: 'Entry not found',
    evidence: { id: params.id },
  })),
  E.chain(renderWithIncludes(queries, params.include)),
)

export const getEntry = (queries: Queries): Service => () => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.chainW(renderResult(queries)),
)

