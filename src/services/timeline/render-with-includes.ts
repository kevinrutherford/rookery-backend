import * as O from 'fp-ts/Option'
import { renderCollectionCreated } from './render-collection-created'
import { renderCommentCreated } from './render-comment-created'
import { renderCommunityCreated } from './render-community-created'
import { renderDiscussionStarted } from './render-discussion-started'
import { renderFrontMatterFetched } from './render-front-matter-fetched'
import { renderInboxCommentCreated } from './render-inbox-comment-created'
import { renderWorkNotFound } from './render-work-not-found'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, Update } from '../../domain/index.open'

export const renderWithIncludes = (queries: Domain) => (update: Update): O.Option<UpdateWithIncludes> => {
  switch (update.kind) {
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
      return O.some(renderWorkNotFound(queries, update))
    case 'inbox-update:comment-created':
      return O.some(renderInboxCommentCreated(queries, update))
    default:
      return O.none
  }
}

