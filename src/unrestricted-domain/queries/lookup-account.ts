import * as E from 'fp-ts/Either'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const lookupAccount = (currentState: Readmodel): Domain['lookupAccount'] => (accountId) => E.right({
  id: accountId,
  username: 'DonnaBramwell',
  displayName: 'Donna Bramwell',
  avatarUrl: 'https://assets.website-files.com/6278ea240c19526063fea7fb/629384b3aefd5da66f82e759_DB.PNG',
})

