import { JsonApiResource } from './json-api-resource'
import { renderCommentIdentifier } from './render-comment-identifier'
import { renderDiscussionIdentifier } from './render-discussion-identifier'
import { renderMemberIdentifier } from './render-member-identifier'
import { Comment } from '../../domain/index.open'

export const renderComment = (comment: Comment): JsonApiResource => ({
  ...renderCommentIdentifier(comment.id),
  attributes: {
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
  },
  relationships: {
    author: { data: renderMemberIdentifier(comment.authorId) },
    entry: { data: renderDiscussionIdentifier(comment.entryId) },
  },
})

