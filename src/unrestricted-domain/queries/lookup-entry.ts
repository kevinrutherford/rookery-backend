import * as E from 'fp-ts/Either'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const lookupEntry = (currentState: Readmodel): Domain['lookupEntry'] => (entryId) => pipe(
  currentState.discussionsByEntryId,
  RM.lookup(S.Eq)(entryId),
  E.fromOption(() => 'not-found' as const),
)

