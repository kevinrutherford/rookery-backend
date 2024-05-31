import { Readmodel } from './readmodel'

export const getCommunity = (currentState: Readmodel) => (): Readmodel['data'] => currentState.data

