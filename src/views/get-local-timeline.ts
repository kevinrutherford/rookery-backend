import * as D from 'fp-ts/Date'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { View } from '../http/index.open'
import { Queries } from '../readmodels'
import { DomainEvent } from '../readmodels/domain-event'
import { TimelineEvent } from '../readmodels/local-timeline/timeline-event'

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

export const getLocalTimeline = (queries: Queries): View => () => {
  return TE.right({
    type: 'Timeline',
    data: pipe(
      queries.getLocalTimeline(),
      RA.map(toTimelineEvent),
      RA.sort(byDateDescending),
      RA.map((item) => ({
        ...item,
        timestamp: item.timestamp.toISOString(),
      })),
    ),
  })
}

