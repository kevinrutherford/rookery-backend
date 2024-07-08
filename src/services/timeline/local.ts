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
import { toFrontMatterFoundParagraph } from './to-front-matter-found-paragraph'
import { toWorkNotFoundParagraph } from './to-work-not-found-paragraph'
import { Activity, Domain } from '../../domain/index.open'
import { renderCommunity } from '../json-api/render-community'
import { renderUpdateResource } from '../json-api/render-update-resource'
import { Service } from '../service'

type TimelineEvent = ReturnType<Domain['getLocalTimeline']>[number]

const toTimelineUpdate = (queries: Domain) => (update: TimelineEvent): O.Option<Activity> => {
  switch (update.type) {
    case 'update:community-created':
      return toCommunityCreatedUpdate(update)
    case 'collection-created':
      return toCollectionCreatedParagraph(update)
    case 'doi-entered':
      return toDoiEnteredParagraph(queries)(update)
    case 'comment-created':
      return toCommentCreatedParagraph(update)
    case 'update:front-matter-found':
      return toFrontMatterFoundParagraph(update)
    case 'update:work-not-found':
      return toWorkNotFoundParagraph(update)
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

export const getLocalTimeline = (queries: Domain): Service => () => pipe(
  queries.getLocalTimeline(),
  RA.map(toTimelineUpdate(queries)),
  RA.compact,
  RA.sort(byDateDescending),
  RA.map(renderUpdateResource),
  (updates) => ({
    data: updates,
    included: pipe(
      queries.getCommunity(),
      O.match(
        () => [],
        (community) => [renderCommunity(community)],
      ),
    ),
  }),
  E.right,
)

