import { renderCommentIdentifier } from './render-comment-identifier'
import { Comment } from '../../domain-model/comments/comment'
import { renderEntryIdentifier } from '../entry/render-entry-identifier'
import { JsonApiResource } from '../json-api-resource'

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

