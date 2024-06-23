import * as O from 'fp-ts/Option'
import { Collection } from './collections/collection'
import { Entry } from './entries/entry'
import { Work } from './works/work'
import {
  Activity,
  Comment, Community, DomainProbe,
} from '../domain/index.open'

export type Readmodel = {
  activities: ReadonlyArray<Activity>,
  collections: Map<string, Collection>,
  comments: Map<string, Array<Comment>>,
  community: O.Option<Community>,
  entriesByCollection: Map<string, Array<Entry>>,
  entriesByEntryId: Map<string, Entry>,
  works: Map<string, Work>,
  info: DomainProbe,
}

