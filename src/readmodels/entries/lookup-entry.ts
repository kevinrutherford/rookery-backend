import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Entry } from './entry'
import { Readmodel } from './readmodel'

type LookupEntry = (currentState: Readmodel)
=> (collectionId: string)
=> O.Option<Entry>

export const lookupEntry: LookupEntry = (currentState) => (entryId) => pipe(
  currentState.byEntryId,
  RM.lookup(S.Eq)(entryId),
)

