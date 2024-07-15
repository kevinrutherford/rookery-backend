import * as O from 'fp-ts/Option'
import { Collection } from './collection'
import { Entry } from './entry'
import { Work } from './work'
import {
  Account,
  Comment, Community, DomainProbe, Update,
} from '../../domain/index.open'

export type Readmodel = {
  accounts: Map<string, Account>,
  activities: Array<Update>,
  collections: Map<string, Collection>,
  comments: Map<string, Array<Comment>>,
  community: O.Option<Community>,
  entriesByCollection: Map<string, Array<Entry>>,
  entriesByEntryId: Map<string, Entry>,
  works: Map<string, Work>,
  info: DomainProbe,
}

