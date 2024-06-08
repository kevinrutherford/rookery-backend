import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types'
import { renderCollection } from './render-collection'
import { Queries } from '../../domain-model'
import { Collection } from '../../domain-model/collections/collection'
import { renderEntry } from '../entry/render-entry'
import { JsonApiResource } from '../json-api-resource'
import { validateInput } from '../validate-input'
import { View } from '../view'
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
        RA.compact,
        RA.map(renderWork),
      )
    default:
      return []
  }
}

const renderWithIncludes = (queries: Queries, incl: Params['include']) => (collection: Collection) => pipe(
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

const renderNotFoundErrorDocument = (collectionId: string) => ({
  category: 'not-found' as const,
  message: 'Collection not found',
  evidence: { collectionId },
})

const renderResult = (queries: Queries, clientCan: Parameters<View>[0]) => (params: Params) => pipe(
  params.id,
  queries.lookupCollection,
  E.fromOption(() => renderNotFoundErrorDocument(params.id)),
  E.filterOrElse(
    (collection) => !collection.isPrivate || clientCan('browse-private-collections'),
    () => renderNotFoundErrorDocument(params.id),
  ),
  E.map(renderWithIncludes(queries, params.include)),
)

export const getCollection = (queries: Queries): View => (isAuthenticated) => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.chainW(renderResult(queries, isAuthenticated)),
)

