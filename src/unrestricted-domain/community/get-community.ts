import { Readmodel } from './readmodel'
import { Domain } from '../../services/domain'

export const getCommunity = (currentState: Readmodel): Domain['getCommunity'] => () => currentState.data

