import { Readmodel } from './readmodel'
import { Domain } from '../../services/index.open'

export const getCommunity = (currentState: Readmodel): Domain['getCommunity'] => () => currentState.data

