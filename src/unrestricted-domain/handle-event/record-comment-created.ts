import { CommentCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordCommentCreated = (state: Readmodel, event: CommentCreatedEvent): void => {
  const comment = event.data
  const entry = state.entriesByEntryId.get(comment.entryId)
  if (entry === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  const collection = state.collections.get(entry.collectionId)
  if (collection === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  const current = state.comments.get(comment.entryId) ?? [] // SMELL: could be stored on the entry
  current.push({
    ...comment,
    authorId: 'you', // SMELL -- should come from the event
    createdAt: event.created,
  })
  state.comments.set(comment.entryId, current)

  entry.commentsCount += 1 // SMELL: is this really necessary now we have a unified readmodel?

  state.activities.push({
    type: event.type,
    id: event.id,
    created: event.created,
    actorId: 'you',
    occurredWithinPrivateCollection: collection.isPrivate,
    content: event.data.content,
    entryId: comment.entryId,
    workId: entry.workId,
  })
}

