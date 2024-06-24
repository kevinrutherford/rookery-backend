import { Domain } from '../../domain/index.open'
import { Readmodel } from '../readmodel'

export const getCommunity = (currentState: Readmodel): Domain['getCommunity'] => () => currentState.community

