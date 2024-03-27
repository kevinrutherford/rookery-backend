import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { renderEntry } from '../entry/render-entry'
import { validateInput } from '../validate-input'

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
      entries: pipe(
        collection.id,
        queries.findEntries,
        RA.map(renderEntry),
      ),
    },
  })),
  T.of,
)

