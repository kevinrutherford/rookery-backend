import * as D from 'fp-ts/Date'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { toCollectionCreatedParagraph } from './to-collection-created-paragraph'
import { toCommentCreatedParagraph } from './to-comment-created-paragraph'
import { toCommunityCreatedUpdate } from './to-community-created-update'
import { toDoiEnteredParagraph } from './to-doi-entered-paragraph'
import { toWorkUpdatedParagraph } from './to-work-updated-paragraph'
import { Activity, Domain } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'
import { Service } from '../service'

type TimelineEvent = ReturnType<Domain['getLocalTimeline']>[number]

const toTimelineUpdate = (queries: Domain) => (event: TimelineEvent): O.Option<Activity> => {
  switch (event.type) {
    case 'community-created':
      return toCommunityCreatedUpdate(event)
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
  Ord.contramap((event) => event.occurred_at),
)

const byDateDescending: Ord.Ord<Activity> = pipe(
  byDate,
  Ord.reverse,
)

export const getLocalTimeline = (queries: Domain): Service => () => () => pipe(
  queries.getLocalTimeline(),
  RA.map(toTimelineUpdate(queries)),
  RA.compact,
  RA.sort(byDateDescending),
  RA.map(renderUpdateResource),
  (updates) => ({
    data: updates,
    included: [],
  }),
  E.right,
)

