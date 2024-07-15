import * as D from 'fp-ts/Date'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { renderCommunityCreatedUpdate } from './render-community-created-update'
import { toCollectionCreatedParagraph } from './to-collection-created-paragraph'
import { toCommentCreatedParagraph } from './to-comment-created-paragraph'
import { toDoiEnteredParagraph } from './to-doi-entered-paragraph'
import { toFrontMatterFoundParagraph } from './to-front-matter-found-paragraph'
import { toWorkNotFoundParagraph } from './to-work-not-found-paragraph'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, Update } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { Service } from '../service'

const toTimelineUpdate = (queries: Domain) => (update: Update): UpdateWithIncludes => {
  switch (update.type) { // SMELL -- duplicated switch? consider driving all copies from data
    case 'update:community-created':
      return renderCommunityCreatedUpdate(queries, update)
    case 'collection-created':
      return toCollectionCreatedParagraph(queries, update)
    case 'doi-entered':
      return toDoiEnteredParagraph(queries)(update)
    case 'comment-created':
      return toCommentCreatedParagraph(update)
    case 'update:front-matter-found':
      return toFrontMatterFoundParagraph(update)
    case 'update:work-not-found':
      return toWorkNotFoundParagraph(queries, update)
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
    (resource) => ({
      data: [...memo.data, resource],
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

