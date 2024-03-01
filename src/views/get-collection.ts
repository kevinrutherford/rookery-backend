import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validateInput } from './validate-input'
import { View } from './view'
import { Queries } from '../readmodels/queries'

const paramsCodec = t.type({
  id: t.string,
})

export const getCollection = (queries: Queries): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.map(queries.lookupCollection),
  E.map((collection) => ({
    type: 'Collection',
    data: collection,
  })),
)

