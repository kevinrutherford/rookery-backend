import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { View } from './view'

export const getCollections = (): View => () => pipe(
  {
    type: 'Collections',
    data: [
      {
        id: '56c160e6-d842-4afe-88e3-d492abaf48d5',
        name: 'CHS',
        description: 'Papers under review by the CHS project',
        papersCount: 12,
        commentsCount: 23,
        followersCount: 4,
        lastActivityAt: '4 hours ago',
      },
      {
        id: '4c2c102c-0767-4a6c-b5c9-e1043286fa86',
        name: 'PRU3',
        description: 'Papers to be referenced by the PRU3 project',
        papersCount: 134,
        commentsCount: 258,
        followersCount: 11,
        lastActivityAt: '3 days ago',
      },
    ],
  },
  E.right,
)

