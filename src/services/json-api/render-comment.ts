import { JsonApiResource } from './json-api-resource'
import { renderAccountIdentifier } from './render-account-identifier'
import { renderCommentIdentifier } from './render-comment-identifier'
import { renderEntryIdentifier } from './render-entry-identifier'
import { Comment } from '../../domain/index.open'

export const renderComment = (comment: Comment): JsonApiResource => ({
  ...renderCommentIdentifier(comment.id),
  attributes: {
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
  },
  relationships: {
    author: { data: renderAccountIdentifier(comment.authorId) },
    entry: { data: renderEntryIdentifier(comment.entryId) },
  },
})

