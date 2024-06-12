import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Readmodel } from './readmodel'
import { Queries } from '../../services/queries'

export const lookupEntry = (currentState: Readmodel): Queries['lookupEntry'] => (entryId) => pipe(
  currentState.byEntryId,
  RM.lookup(S.Eq)(entryId),
)

