import { Readmodel } from './readmodel'
import { Domain } from '../../domain/index.open'

export const getCommunity = (currentState: Readmodel): Domain['getCommunity'] => () => currentState.data

