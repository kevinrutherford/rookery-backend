import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { View } from '../../http/index.open'

export const getRoot = (): View => () => pipe(
  {
    data: {
      type: 'root',
      id: '0',
      relationships: {
        community: {
          data: {
            type: 'community',
            id: '1',
          },
        },
      },
    },
  },
  TE.right,
)

