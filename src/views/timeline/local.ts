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
import { WorkUpdated } from '../../readmodels/local-timeline/readmodel'
import { Work } from '../../readmodels/works/work'

type TimelineEvent = ReturnType<Queries['getLocalTimeline']>[number]

const titleOf = (work: Work) => {
  switch (work.frontMatter.crossrefStatus) {
    case 'not-determined':
    case 'not-found':
      return work.id
    case 'found':
      return work.frontMatter.title
  }
}

const contentForUpdate = (event: WorkUpdated) => {
  switch (event.data.attributes.crossrefStatus) {
    case 'not-determined':
      return O.none
    case 'not-found':
      return O.some({
        userHandle: 'CrossrefBot',
        action: 'could not find a DOI',
        content: event.data.workId,
        timestamp: event.created,
      })
    case 'found':
      return O.some({
        userHandle: 'CrossrefBot',
        action: 'found the title of a paper',
        content: event.data.attributes.title,
        timestamp: event.created,
      })
  }
}

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
          work: O.some(queries.lookupWork(event.data.workId)),
        },
        sequenceS(O.Apply),
        O.map(({ collection, work }) => ({
          userHandle: 'you',
          action: `added an item to collection ${collection.name}`,
          content: titleOf(work),
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
    case 'work-updated':
      return contentForUpdate(event)
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

