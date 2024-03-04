import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { identity, pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Comment } from './comment'
import { Readmodel } from './readmodel'

export const findComments = (currentState: Readmodel) => (entryId: string): ReadonlyArray<Comment> => pipe(
  currentState,
  RM.lookup(S.Eq)(entryId),
  O.match(
    () => [],
    identity,
  ),
)

