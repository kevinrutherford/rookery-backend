import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Service } from '../service'

export const getFollowers = (): Service => () => pipe(
  {
    data: [],
  },
  E.right,
)

