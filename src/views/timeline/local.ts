import * as D from 'fp-ts/Date'
import * as E from 'fp-ts/Either'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { TimelineParagraph } from './timeline-paragraph'
import { ErrorOutcome, View } from '../../http/index.open'
import { Queries } from '../../readmodels'

type TimelineEvent = ReturnType<Queries['getLocalTimeline']>[number]

const toTimelineParagraph = (queries: Queries) => (event: TimelineEvent): E.Either<ErrorOutcome, TimelineParagraph> => {
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
          category: 'not-found',
          message: 'Should not happen: collection not found',
          evidence: { event },
        }) as ErrorOutcome),
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

const byDate: Ord.Ord<TimelineParagraph> = pipe(
  D.Ord,
  Ord.contramap((event) => event.timestamp),
)

const byDateDescending: Ord.Ord<TimelineParagraph> = pipe(
  byDate,
  Ord.reverse,
)

export const getLocalTimeline = (queries: Queries): View => () => pipe(
  queries.getLocalTimeline(),
  RA.map(toTimelineParagraph(queries)),
  RA.rights,
  RA.sort(byDateDescending),
  RA.map((item) => ({
    ...item,
    timestamp: item.timestamp.toISOString(),
  })),
  (paragraphs) => TE.right({
    type: 'Timeline',
    data: paragraphs,
  }),
)

