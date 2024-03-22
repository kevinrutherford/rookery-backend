import * as D from 'fp-ts/Date'
import * as E from 'fp-ts/Either'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { ParagraphRenderer } from './paragraph-renderer'
import { renderCollectionCreated } from './render-collection-created'
import { renderCommentCreated } from './render-comment-created'
import { renderDoiEntered } from './render-doi-entered'
import { TimelineParagraph } from './timeline-paragraph'
import { ErrorOutcome, View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { DomainEvent } from '../../readmodels/domain-event'

const toTimelineParagraph = (queries: Queries) => (event: DomainEvent): E.Either<ErrorOutcome, TimelineParagraph> => {
  switch (event.type) {
    case 'collection-created':
      return renderCollectionCreated(event)
    case 'doi-entered':
      return renderDoiEntered(queries)(event)
    case 'comment-created':
      return renderCommentCreated(event)
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

export const getLocalTimeline = (queries: Queries, renderers: Map<string, ParagraphRenderer>): View => () => pipe(
  queries.getLocalTimeline(),
  RA.filter((para) => renderers.has(para.type)),
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

