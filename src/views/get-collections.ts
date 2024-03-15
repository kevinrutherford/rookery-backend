import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { View } from '../http/index.open'
import { Queries } from '../readmodels'

export const getCollections = (queries: Queries): View => () => pipe(
  queries.allCollections(),
  (collections) => ({
    type: 'Collections',
    data: collections,
  }),
  TE.right,
)

