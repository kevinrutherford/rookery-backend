import * as D from 'fp-ts/Date'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { toCollectionCreatedParagraph } from './to-collection-created-paragraph'
import { toCommentCreatedParagraph } from './to-comment-created-paragraph'
import { toDoiEnteredParagraph } from './to-doi-entered-paragraph'
import { toWorkUpdatedParagraph } from './to-work-updated-paragraph'
import { Domain } from '../../domain/index.open'
import { Activity } from '../activity-resource'
import { renderActivityResource } from '../json-api/render-activity-resource'
import { Service } from '../service'

type TimelineEvent = ReturnType<Domain['getLocalTimeline']>[number]

const toTimelineActivity = (queries: Domain) => (event: TimelineEvent): O.Option<Activity> => {
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

const byDate: Ord.Ord<Activity> = pipe(
  D.Ord,
  Ord.contramap((event) => event.timestamp),
)

const byDateDescending: Ord.Ord<Activity> = pipe(
  byDate,
  Ord.reverse,
)

export const getLocalTimeline = (queries: Domain): Service => () => () => pipe(
  queries.getLocalTimeline(),
  RA.map(toTimelineActivity(queries)),
  RA.compact,
  RA.sort(byDateDescending),
  RA.map(renderActivityResource),
  (paragraphs) => ({
    data: paragraphs,
  }),
  E.right,
)

