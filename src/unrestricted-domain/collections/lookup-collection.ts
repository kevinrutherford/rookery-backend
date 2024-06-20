import * as E from 'fp-ts/Either'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Readmodel } from './readmodel'
import { Domain } from '../../domain/index.open'

export const lookupCollection = (currentState: Readmodel): Domain['lookupCollection'] => (collectionId) => pipe(
  currentState,
  RM.lookup(S.Eq)(collectionId),
  E.fromOption(() => 'not-found'),
)

