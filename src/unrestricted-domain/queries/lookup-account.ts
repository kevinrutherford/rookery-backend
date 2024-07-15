import * as E from 'fp-ts/Either'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const lookupAccount = (currentState: Readmodel): Domain['lookupAccount'] => (accountId) => pipe(
  currentState.accounts,
  RM.lookup(S.Eq)(accountId),
  E.fromOption(() => 'not-found'),
)

