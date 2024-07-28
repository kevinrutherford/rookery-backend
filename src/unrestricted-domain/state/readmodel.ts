import * as O from 'fp-ts/Option'
import { Collection } from './collection'
import { Entry } from './entry'
import { Work } from './work'
import {
  Comment,
  Community, DomainProbe, Member, Update,
} from '../../domain/index.open'

export type Readmodel = {
  collections: Map<string, Collection>,
  comments: Map<string, Array<Comment>>,
  community: O.Option<Community>,
  entriesByCollection: Map<string, Array<Entry>>,
  entriesByEntryId: Map<string, Entry>,
  info: DomainProbe,
  members: Map<string, Member>,
  updates: Array<Update>,
  works: Map<string, Work>,
}

