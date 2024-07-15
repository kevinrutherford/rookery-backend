import * as O from 'fp-ts/Option'
import { Collection } from './collection'
import { Entry } from './entry'
import { Readmodel } from './readmodel'
import { Work } from './work'
import { Comment } from '../../domain/index.open'

const hardcodedAccounts = new Map([
  ['CrossrefBot', {
    id: 'CrossrefBot',
    username: 'CrossrefBot',
    displayName: 'CrossrefBot',
    avatarUrl: 'https://asset.brandfetch.io/id_5Dmyi4E/idry8ek_jg.jpeg',
  }],
  ['you', {
    id: 'you',
    username: 'DonnaBramwell',
    displayName: 'Donna Bramwell',
    avatarUrl: 'https://assets.website-files.com/6278ea240c19526063fea7fb/629384b3aefd5da66f82e759_DB.PNG',
  }],
])

export const instantiate = (): Readmodel => ({
  accounts: hardcodedAccounts,
  activities: [],
  collections: new Map<string, Collection>(),
  comments: new Map<string, Array<Comment>>(),
  community: O.none,
  entriesByCollection: new Map<string, Array<Entry>>(),
  entriesByEntryId: new Map<string, Entry>(),
  works: new Map<string, Work>(),
  info: {
    eventsCount: 0,
    unexpectedEvents: [],
    unrecognisedEvents: [],
  },
})

