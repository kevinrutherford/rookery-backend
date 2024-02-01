import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { View } from '../view'

export const getCollections = (): View => () => pipe(
  {
    type: 'Collections',
    data: [
      {
        name: 'CHS',
        description: 'Papers under review by the CHS project',
        papersCount: 12,
        commentsCount: 23,
        followersCount: 4,
        lastActivityAt: '4 hours ago',
      },
      {
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

