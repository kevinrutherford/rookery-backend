import { Json } from 'io-ts-types'
import { renderCommentIdentifier } from './render-comment-identifier'
import { Comment } from '../../readmodels/comments/comment'
import { renderEntryIdentifier } from '../entry/render-entry-identifier'

export const renderComment = (comment: Comment): Json => ({
  ...renderCommentIdentifier(comment.id),
  attributes: {
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
  },
  relationships: {
    entry: {
      data: renderEntryIdentifier(comment.entryId),
    },
  },
})

