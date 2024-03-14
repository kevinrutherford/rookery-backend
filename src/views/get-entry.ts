import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validateInput } from './validate-input'
import { View } from '../http/index.open'
import { Queries } from '../readmodels'

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
    type: 'Entry',
    data: {
      ...entry,
      comments: queries.findComments(entry.id),
    },
  })),
)

