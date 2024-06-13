import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Readmodel } from './readmodel'
import { Work } from './work'

type LookupWork = (currentState: Readmodel) => (id: string) => O.Option<Work>

export const lookupWork: LookupWork = (currentState) => (id) => pipe(
  currentState,
  RM.lookup(S.Eq)(id),
)

