import { Readmodel } from './readmodel'
import { Queries } from '../../views/queries'

export const getCommunity = (currentState: Readmodel): Queries['getCommunity'] => () => currentState.data

