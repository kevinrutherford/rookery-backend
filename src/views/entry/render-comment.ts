import { Json } from 'io-ts-types'
import { Comment } from '../../readmodels/comments/comment'

export const renderComment = (comment: Comment): Json => ({
  type: 'comment',
  id: comment.id,
  attributes: {
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
  },
  relationships: {
    entry: {
      data: { type: 'entry', id: comment.entryId },
    },
  },
})

