import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Collection } from './all-collections'

type LookupCollection = (currentState: Map<string, Collection>)
=> (collectionId: string)
=> O.Option<Collection>

export const lookupCollection: LookupCollection = (currentState) => (collectionId) => pipe(
  currentState,
  RM.lookup(S.Eq)(collectionId),
)

