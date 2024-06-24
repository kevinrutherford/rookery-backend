import * as E from 'fp-ts/Either'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../readmodel'

export const lookupCollection = (currentState: Readmodel): Domain['lookupCollection'] => (collectionId) => pipe(
  currentState.collections,
  RM.lookup(S.Eq)(collectionId),
  E.fromOption(() => 'not-found'),
)

