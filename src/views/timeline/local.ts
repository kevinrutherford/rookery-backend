import { sequenceS } from 'fp-ts/Apply'
import * as D from 'fp-ts/Date'
import * as O from 'fp-ts/Option'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { TimelineParagraph } from './timeline-paragraph'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'

type TimelineEvent = ReturnType<Queries['getLocalTimeline']>[number]

const toTimelineParagraph = (queries: Queries) => (event: TimelineEvent): O.Option<TimelineParagraph> => {
  switch (event.type) {
    case 'collection-created':
      return O.some({
        userHandle: 'you',
        action: `created collection ${event.data.name}`,
        content: '',
        timestamp: event.created,
      })
    case 'doi-entered':
      return pipe(
        {
          collection: queries.lookupCollection(event.data.collectionId),
          entry: queries.lookupEntry(event.data.id),
        },
        sequenceS(O.Apply),
        O.map(({ collection, entry }) => ({
          userHandle: 'you',
          action: `added a paper to collection ${collection.name}`,
          content: entry.frontMatter ? entry.frontMatter.title : event.data.doi,
          timestamp: event.created,
        })),
      )
    case 'comment-created':
      return O.some({
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
  RA.compact,
  RA.sort(byDateDescending),
  RA.map((item) => ({
    ...item,
    timestamp: item.timestamp.toISOString(),
  })),
  (paragraphs) => TE.right({
    data: paragraphs,
  }),
)

