import { recordUpdate } from './record-update'
import { CommentCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordCommentCreated = (state: Readmodel, event: CommentCreatedEvent): void => {
  const comment = event.data
  const discussion = state.discussionsByDiscussionId.get(comment.discussionId)
  if (discussion === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  const collection = state.collections.get(discussion.collectionId)
  if (collection === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  const current = state.comments.get(comment.discussionId) ?? [] // SMELL: could be stored on the discussion
  current.push({
    id: comment.id,
    discussionId: comment.discussionId,
    content: comment.content,
    authorId: event.data.actorId,
    createdAt: event.created,
  })
  state.comments.set(comment.discussionId, current)

  discussion.commentsCount += 1 // SMELL: is this really necessary now we have a unified readmodel?

  recordUpdate(state, {
    kind: 'update:comment-created',
    id: event.id,
    created: event.data.publishedAt,
    actorId: event.data.actorId,
    occurredWithinPrivateCollection: collection.isPrivate,
    content: event.data.content,
    discussionId: comment.discussionId,
    workId: discussion.workId,
  })
}

