import * as A from 'fp-ts/Array'
import * as D from 'fp-ts/Date'
import * as Ord from 'fp-ts/Ord'
import { pipe } from 'fp-ts/function'
import { Readmodel } from './readmodel'
import { TimelineEvent } from './timeline-event'
import { DomainEvent } from '../domain-event'

const toTimelineEvent = (event: DomainEvent): TimelineEvent => {
  switch (event.type) {
    case 'collection-created':
      return {
        userHandle: 'you',
        action: `created collection ${event.data.name}`,
        content: '',
        timestamp: event.created,
      }
    case 'doi-entered':
      return {
        userHandle: 'you',
        action: `added a paper to collection ${event.data.collectionId}`,
        content: event.data.doi,
        timestamp: event.created,
      }
    case 'comment-created':
      return {
        userHandle: 'you',
        action: 'commented',
        content: event.data.content,
        timestamp: event.created,
      }
  }
}

const byDate: Ord.Ord<TimelineEvent> = pipe(
  D.Ord,
  Ord.contramap((event) => event.timestamp),
)

const byDateDescending: Ord.Ord<TimelineEvent> = pipe(
  byDate,
  Ord.reverse,
)

type GetLocalTimeline = (currentState: Readmodel)
=> ()
=> ReadonlyArray<{
  userHandle: string,
  timestamp: string,
  action: string,
  content: string,
}>

export const getLocalTimeline: GetLocalTimeline = (currentState) => () => pipe(
  currentState,
  A.map(toTimelineEvent),
  A.sort(byDateDescending),
  A.map((item) => ({
    ...item,
    timestamp: item.timestamp.toISOString(),
  })),
)

