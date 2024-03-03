import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { identity, pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Entry } from './entry'
import { Readmodel } from './readmodel'

export const findEntries = (currentState: Readmodel) => (collectionId: string): ReadonlyArray<Entry> => pipe(
  currentState,
  RM.lookup(S.Eq)(collectionId),
  O.match(
    () => [],
    identity,
  ),
)

