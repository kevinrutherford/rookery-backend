import * as O from 'fp-ts/Option'
import { Entry } from './entry'
import { Readmodel } from './readmodel'

type LookupEntry = (currentState: Readmodel)
=> (collectionId: string)
=> O.Option<Entry>

export const lookupEntry: LookupEntry = () => () => O.none

