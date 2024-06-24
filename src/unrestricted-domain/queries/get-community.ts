import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const getCommunity = (currentState: Readmodel): Domain['getCommunity'] => () => currentState.community

