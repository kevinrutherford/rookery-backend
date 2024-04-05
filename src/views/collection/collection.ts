import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { Json, optionFromNullable } from 'io-ts-types'
import { renderCollection } from './render-collection'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { Collection } from '../../readmodels/collections/collection'
import { renderEntry } from '../entry/render-entry'
import { JsonApiResource } from '../json-api-resource'
import { validateInput } from '../validate-input'
import { renderWork } from '../work/render-work'

const includes = t.union([
  t.literal('entries'),
  t.literal('entries.work'),
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

const getInc = (queries: Queries, collection: Collection) => (opt: Includes): ReadonlyArray<JsonApiResource> => {
  switch (opt) {
    case 'entries':
      return pipe(
        collection.id,
        queries.findEntries,
        RA.map(renderEntry),
      )
    case 'entries.work':
      return pipe(
        collection.id,
        queries.findEntries,
        RA.map((entry) => entry.workId),
        RA.map(queries.lookupWork),
        RA.map(renderWork),
      )
    default:
      return []
  }
}

const renderWithIncludes = (queries: Queries, incl: Params['include']) => (collection: Collection): Json => pipe(
  incl,
  O.match(
    () => ({
      data: renderCollection(collection),
    }),
    (incs) => pipe(
      incs,
      RA.chain(getInc(queries, collection)),
      (i) => ({
        data: renderCollection(collection),
        included: i,
      }),
    ),
  ),
)

const renderResult = (queries: Queries) => (params: Params) => pipe(
  params.id,
  queries.lookupCollection,
  E.fromOption(() => ({
    category: 'not-found' as const,
    message: 'Collection not found',
    evidence: { id: params.id },
  })),
  E.map(renderWithIncludes(queries, params.include)),
)

export const getCollection = (queries: Queries): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.chainW(renderResult(queries)),
  T.of,
)

