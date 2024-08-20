import * as E from 'fp-ts/Either'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const lookupMember = (currentState: Readmodel): Domain['lookupMember'] => (memberId) => pipe(
  currentState.members,
  RM.lookup(S.Eq)(memberId),
  E.fromOption(() => 'not-found' as const),
)

