import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { renderCollection } from './render-collection'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'

export const getCollections = (queries: Queries): View => () => pipe(
  queries.allCollections(),
  RA.map(renderCollection),
  (collections) => ({
    data: collections,
  }),
  TE.right,
)

