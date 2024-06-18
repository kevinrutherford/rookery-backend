import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { identity, pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Readmodel } from './readmodel'
import { Domain } from '../../services/index.open'

export const findEntries = (currentState: Readmodel): Domain['findEntries'] => (collectionId) => pipe(
  currentState.byCollection,
  RM.lookup(S.Eq)(collectionId),
  O.match(
    () => [],
    identity,
  ),
)

