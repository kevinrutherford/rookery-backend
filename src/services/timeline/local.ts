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
import { Activity, Domain, Update } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderCommunity } from '../json-api/render-community'
import { renderUpdateResource } from '../json-api/render-update-resource'
import { Service } from '../service'

type UpdateWithIncludes = {
  data: O.Option<Activity>,
  included: ReadonlyArray<JsonApiResource>,
}

const toTimelineUpdate = (queries: Domain) => (update: Update): UpdateWithIncludes => {
  switch (update.type) {
    case 'update:community-created':
      return {
        data: toCommunityCreatedUpdate(update),
        included: pipe(
          queries.getCommunity(),
          O.match(
            () => [],
            (community) => [renderCommunity(community)],
          ),
        ),
      }
    case 'collection-created':
      return {
        data: toCollectionCreatedParagraph(update),
        included: [],
      }
    case 'doi-entered':
      return {
        data: toDoiEnteredParagraph(queries)(update),
        included: [],
      }
    case 'comment-created':
      return {
        data: toCommentCreatedParagraph(update),
        included: [],
      }
    case 'update:front-matter-found':
      return {
        data: toFrontMatterFoundParagraph(update),
        included: [],
      }
    case 'update:work-not-found':
      return {
        data: toWorkNotFoundParagraph(update),
        included: [],
      }
    default:
      return {
        data: O.none,
        included: [],
      }
  }
}

const byDate: Ord.Ord<Update> = pipe(
  D.Ord,
  Ord.contramap((update) => update.created),
)

const byDateDescending: Ord.Ord<Update> = pipe(
  byDate,
  Ord.reverse,
)

type JsonApiTimeline = {
  data: ReadonlyArray<JsonApiResource>,
  included: ReadonlyArray<JsonApiResource>,
}

const appendUpdate = (memo: JsonApiTimeline, para: UpdateWithIncludes): JsonApiTimeline => pipe(
  para.data,
  O.match(
    () => memo,
    (update) => ({
      data: [...memo.data, renderUpdateResource(update)],
      included: [...memo.included, ...para.included],
    }),
  ),
)

export const getLocalTimeline = (queries: Domain): Service => () => pipe(
  queries.getLocalTimeline(),
  RA.sort(byDateDescending),
  RA.map(toTimelineUpdate(queries)),
  RA.reduce({ data: [], included: [] }, appendUpdate),
  E.right,
)

