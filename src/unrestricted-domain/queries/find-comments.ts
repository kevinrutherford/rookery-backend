import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { identity, pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../readmodel'

export const findComments = (currentState: Readmodel): Domain['findComments'] => (entryId) => pipe(
  currentState.comments,
  RM.lookup(S.Eq)(entryId),
  O.match(
    () => [],
    identity,
  ),
)

