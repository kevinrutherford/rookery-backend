import { Readmodel } from './readmodel'
import { Queries } from '../../services/queries'

export const getCommunity = (currentState: Readmodel): Queries['getCommunity'] => () => currentState.data

