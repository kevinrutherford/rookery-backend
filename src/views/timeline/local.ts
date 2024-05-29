import * as D from 'fp-ts/Date'
import * as O from 'fp-ts/Option'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { TimelineParagraph } from './timeline-paragraph'
import { toCollectionCreatedParagraph } from './to-collection-created-paragraph'
import { toCommentCreatedParagraph } from './to-comment-created-paragraph'
import { toDoiEnteredParagraph } from './to-doi-entered-paragraph'
import { toWorkUpdatedParagraph } from './to-work-updated-paragraph'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'

type TimelineEvent = ReturnType<Queries['getLocalTimeline']>[number]

const toTimelineParagraph = (queries: Queries) => (event: TimelineEvent): O.Option<TimelineParagraph> => {
  switch (event.type) {
    case 'collection-created':
      return toCollectionCreatedParagraph(event)
    case 'doi-entered':
      return toDoiEnteredParagraph(queries)(event)
    case 'comment-created':
      return toCommentCreatedParagraph(event)
    case 'work-updated':
      return toWorkUpdatedParagraph(event)
    default:
      return O.none
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
  RA.map((para) => ({
    type: 'timeline-paragraph',
    id: `local-${para.timestamp}`,
    attributes: para,
  })),
  (paragraphs) => TE.right({
    data: paragraphs,
  }),
)

