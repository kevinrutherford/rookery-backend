import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { View } from './view'

type Collection = {
  id: string,
  name: string,
  description: string,
  papersCount: number,
  commentsCount: number,
  followersCount: number,
  lastActivityAt: Date,
}

const allCollections = (): ReadonlyArray<Collection> => {
  return [
    {
      id: 'chs',
      name: 'CHS',
      description: 'Papers under review by the CHS project',
      papersCount: 12,
      commentsCount: 23,
      followersCount: 4,
      lastActivityAt: new Date(),
    },
    {
      id: 'pru3',
      name: 'PRU3',
      description: 'Papers to be referenced by the PRU3 project',
      papersCount: 134,
      commentsCount: 258,
      followersCount: 11,
      lastActivityAt: new Date(),
    },
  ]
}

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

