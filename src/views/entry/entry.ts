import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { renderEntry } from './render-entry'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { renderCollection } from '../collection/render-collection'
import { validateInput } from '../validate-input'

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
      ...renderEntry(entry),
      comments: queries.findComments(entry.id),
    },
    included: pipe(
      [
        pipe(
          entry.collectionId,
          queries.lookupCollection,
          O.map(renderCollection),
        ),
      ],
      RA.compact,
    ),
  })),
  T.of,
)

