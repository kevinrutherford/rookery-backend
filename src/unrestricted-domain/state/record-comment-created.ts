import { CommentCreatedEvent } from '../domain-event'
import { Readmodel } from '../readmodel'

export const recordCommentCreated = (state: Readmodel, event: CommentCreatedEvent): void => {
  const data = event.data
  const current = state.comments.get(data.entryId) ?? []
  current.push({
    ...data,
    createdAt: event.created,
  })
  state.comments.set(data.entryId, current)
}

