import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const getFollowers = (currentState: Readmodel): Domain['getFollowers'] => (memberId) => pipe(
  currentState.members,
  RM.lookup(S.Eq)(memberId),
  E.fromOption(() => 'not-found' as const),
  E.map(() => pipe(
    currentState.followers,
    RM.lookup(S.Eq)(memberId),
    O.getOrElse(() => [] as ReadonlyArray<string>),
  )),
)

