import * as E from 'fp-ts/Either'
import { Service } from '../service'

export const getFederatedTimeline = (): Service => () => E.right({
  data: [],
  included: [],
})

