import * as O from 'fp-ts/Option'
import { Collection } from './collection'
import { Entry } from './entry'
import { Readmodel } from './readmodel'
import { Work } from './work'
import { Comment } from '../../domain/index.open'

export const instantiate = (): Readmodel => ({
  collections: new Map<string, Collection>(),
  comments: new Map<string, Array<Comment>>(),
  community: O.none,
  discussionsByCollection: new Map<string, Array<Entry>>(),
  discussionsByEntryId: new Map<string, Entry>(),
  inbox: [],
  info: {
    eventsCount: 0,
    unexpectedEvents: [],
    unrecognisedEvents: [],
  },
  members: new Map(),
  updates: [],
  works: new Map<string, Work>(),
})

