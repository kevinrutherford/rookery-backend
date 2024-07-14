import * as E from 'fp-ts/Either'
import { Service } from '../service'

export const getFollowingTimeline = (): Service => () => E.right({
  data: [],
  included: [],
})

