import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { View } from '../view'

export const getCollections = (): View => () => pipe(
  {
    type: 'Collections',
    data: [
    ],
  },
  E.right,
)

