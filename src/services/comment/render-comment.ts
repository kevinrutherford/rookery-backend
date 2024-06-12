import { renderCommentIdentifier } from './render-comment-identifier'
import { renderEntryIdentifier } from '../entry/render-entry-identifier'
import { JsonApiResource } from '../json-api-resource'
import { Comment } from '../queries'

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

