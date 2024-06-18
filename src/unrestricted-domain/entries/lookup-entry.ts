import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Readmodel } from './readmodel'
import { Domain } from '../../services/index.open'

export const lookupEntry = (currentState: Readmodel): Domain['lookupEntry'] => (entryId) => pipe(
  currentState.byEntryId,
  RM.lookup(S.Eq)(entryId),
)

