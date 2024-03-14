import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { View } from '../http/index.open'
import { Queries } from '../readmodels'

export const getCollections = (queries: Queries): View => () => pipe(
  queries.allCollections(),
  (collections) => ({
    type: 'Collections',
    data: collections,
  }),
  E.right,
)

