import * as E from 'fp-ts/Either'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/domain'
import { Readmodel } from '../state/readmodel'

export const lookupWork = (currentState: Readmodel): Domain['lookupWork'] => (id) => pipe(
  currentState.works,
  RM.lookup(S.Eq)(id),
  E.fromOption(() => 'not-found' as const),
)

