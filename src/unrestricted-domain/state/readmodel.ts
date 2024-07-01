import * as O from 'fp-ts/Option'
import { Collection } from './collection'
import { Entry } from './entry'
import { TimelineEvent } from './timeline-event'
import { Work } from './work'
import { Comment, Community, DomainProbe } from '../../domain/index.open'

export type Readmodel = {
  activities: Array<TimelineEvent>,
  collections: Map<string, Collection>,
  comments: Map<string, Array<Comment>>,
  community: O.Option<Community>,
  entriesByCollection: Map<string, Array<Entry>>,
  entriesByEntryId: Map<string, Entry>,
  works: Map<string, Work>,
  info: DomainProbe,
}

