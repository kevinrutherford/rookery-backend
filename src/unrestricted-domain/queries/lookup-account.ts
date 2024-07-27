import * as O from 'fp-ts/Option'
import * as RM from 'fp-ts/ReadonlyMap'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const lookupAccount = (currentState: Readmodel): Domain['lookupAccount'] => (accountId) => pipe(
  currentState.accounts,
  RM.lookup(S.Eq)(accountId),
  O.getOrElseW(() => ({
    id: accountId,
    username: 'unknown',
    displayName: 'Unknown User',
    avatarUrl: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png',
  })),
)

