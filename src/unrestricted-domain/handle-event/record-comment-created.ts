import { CommentCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordCommentCreated = (state: Readmodel, event: CommentCreatedEvent): void => {
  const comment = event.data
  const current = state.comments.get(comment.entryId) ?? [] // SMELL: could be stored on the entry
  current.push({
    ...comment,
    createdAt: event.created,
  })
  state.comments.set(comment.entryId, current)

  const existingEntry = state.entriesByEntryId.get(comment.entryId)
  if (existingEntry)
    existingEntry.commentsCount += 1 // SMELL: is this really necessary now we have a unified readmodel?
  // SMELL: If there's no entry, this event is unexpected

  state.activities.push({
    event: {
      ...event,
      isPrivate: false,
    },
  })
}

