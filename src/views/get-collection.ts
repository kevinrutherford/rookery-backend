import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validateInput } from './validate-input'
import { View } from './view'
import { Queries } from '../readmodels'

const paramsCodec = t.type({
  id: t.string,
})

export const getCollection = (queries: Queries): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.flatMapOption(queries.lookupCollection, (id) => ({
    category: 'not-found' as const,
    message: 'Collection not found',
    evidence: { id },
  })),
  E.map((collection) => ({
    type: 'Collection',
    data: {
      type: 'Collection',
      ...collection,
      lastActivityAt: collection.lastActivityAt.toISOString(), // SMELL: duplication?
      entries: queries.findEntries(collection.id),
    },
  })),
)

