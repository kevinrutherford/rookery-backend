import * as O from 'fp-ts/Option'
import { includeMember } from './include-member'
import { includeWork } from './include-work'
import { renderCollectionCreated } from './render-collection-created'
import { renderCommentCreated } from './render-comment-created'
import { renderCommunityCreated } from './render-community-created'
import { renderDiscussionStarted } from './render-discussion-started'
import { renderFrontMatterFetched } from './render-front-matter-fetched'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, Update } from '../../domain/index.open'
import { renderWorkNotFoundUpdateResource } from '../json-api/render-work-not-found-update-resource'

export const renderWithIncludes = (queries: Domain) => (update: Update): O.Option<UpdateWithIncludes> => {
  switch (update.type) {
    case 'update:community-created':
      return O.some(renderCommunityCreated(queries, update))
    case 'update:collection-created':
      return O.some(renderCollectionCreated(queries, update))
    case 'update:doi-entered':
      return O.some(renderDiscussionStarted(queries, update))
    case 'update:comment-created':
      return O.some(renderCommentCreated(queries, update))
    case 'update:front-matter-found':
      return O.some(renderFrontMatterFetched(queries, update))
    case 'update:work-not-found':
      return O.some({
        data: renderWorkNotFoundUpdateResource(update),
        included: [
          includeMember(queries, update.actorId),
          includeWork(queries, update.workId),
        ],
      })
    default:
      return O.none
  }
}

