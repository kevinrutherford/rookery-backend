import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Readmodel } from '../readmodel'
import { Work } from '../works/work'

type LookupWork = (currentState: Readmodel) => (id: string) => O.Option<Work>

export const lookupWork: LookupWork = (currentState) => (id) => pipe(
  currentState.works,
  RM.lookup(S.Eq)(id),
)

