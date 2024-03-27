import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { validateInput } from '../validate-input'

const renderCollectionResource = (queries: Queries) => (id: string) => pipe(
  id,
  queries.lookupCollection,
  O.map((collection) => ({
    type: 'collection',
    id: collection.id,
    attributes: {
      description: collection.description,
      handle: collection.handle,
      name: collection.name,
    },
  })),
)

const paramsCodec = t.type({
  id: t.string,
})

export const getEntry = (queries: Queries): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.flatMapOption(queries.lookupEntry, (id) => ({
    category: 'not-found' as const,
    message: 'Entry not found',
    evidence: { id },
  })),
  E.map((entry) => ({
    data: {
      type: 'entry',
      id: entry.id,
      attributes: {
        addedAt: entry.addedAt.toISOString(),
      },
      comments: queries.findComments(entry.id),
      relationships: {
        collection: {
          type: 'collection',
          id: entry.collectionId,
        },
        work: {
          type: 'work',
          id: entry.doi,
        },
      },
    },
    included: pipe(
      [renderCollectionResource(queries)(entry.collectionId)],
      RA.compact,
    ),
  })),
  T.of,
)

