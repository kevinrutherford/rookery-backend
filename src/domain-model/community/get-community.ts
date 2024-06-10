import * as O from 'fp-ts/Option'
import { Readmodel } from './readmodel'
import { Community } from '../../views/queries'

export const getCommunity = (currentState: Readmodel) => (): O.Option<Community> => currentState.data

