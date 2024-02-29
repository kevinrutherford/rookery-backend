import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { View } from './view'
import { allCollections } from '../readmodels/all-collections'

export const getCollections = (): View => () => pipe(
  allCollections(),
  RA.map((collection) => ({
    ...collection,
    lastActivityAt: collection.lastActivityAt.toISOString(),
  })),
  (collections) => ({
    type: 'Collections',
    data: collections,
  }),
  E.right,
)

