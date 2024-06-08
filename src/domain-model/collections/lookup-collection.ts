import * as E from 'fp-ts/Either'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Collection } from './collection'
import { Readmodel } from './readmodel'

type LookupCollection = (currentState: Readmodel)
=> (collectionId: string)
=> E.Either<'not-found', Collection>

export const lookupCollection: LookupCollection = (currentState) => (collectionId) => pipe(
  currentState,
  RM.lookup(S.Eq)(collectionId),
  E.fromOption(() => 'not-found'),
)

