import * as D from 'fp-ts/Date'
import * as E from 'fp-ts/Either'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { ErrorOutcome, View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { DomainEvent } from '../../readmodels/domain-event'
import { TimelineEvent } from '../../readmodels/local-timeline/timeline-event'

const toTimelineEvent = (queries: Queries) => (event: DomainEvent): E.Either<ErrorOutcome, TimelineEvent> => {
  switch (event.type) {
    case 'collection-created':
      return E.right({
        userHandle: 'you',
        action: `created collection ${event.data.name}`,
        content: '',
        timestamp: event.created,
      })
    case 'doi-entered':
      return pipe(
        event.data.collectionId,
        queries.lookupCollection,
        E.fromOption(() => ({
          category: 'not-found' as const,
          message: 'Should not happen: collection not found',
          evidence: { event },
        })),
        E.map((collection) => ({
          userHandle: 'you',
          action: `added a paper to collection ${collection.name}`,
          content: event.data.doi,
          timestamp: event.created,
        })),
      )
    case 'comment-created':
      return E.right({
        userHandle: 'you',
        action: 'commented',
        content: event.data.content,
        timestamp: event.created,
      })
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
      RA.map(toTimelineEvent(queries)),
      RA.rights,
      RA.sort(byDateDescending),
      RA.map((item) => ({
        ...item,
        timestamp: item.timestamp.toISOString(),
      })),
    ),
  })
}

