import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { identity, pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const findEntries = (currentState: Readmodel): Domain['findEntries'] => (collectionId) => pipe(
  currentState.discussionsByCollection,
  RM.lookup(S.Eq)(collectionId),
  O.match(
    () => [],
    identity,
  ),
)

