import { JsonApiResource } from './json-api-resource'
import { renderCommentIdentifier } from './render-comment-identifier'
import { renderEntryIdentifier } from './render-entry-identifier'
import { Comment } from '../domain/comment-resource'

export const renderComment = (comment: Comment): JsonApiResource => ({
  ...renderCommentIdentifier(comment.id),
  attributes: {
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
  },
  relationships: {
    entry: { data: renderEntryIdentifier(comment.entryId) },
  },
})

