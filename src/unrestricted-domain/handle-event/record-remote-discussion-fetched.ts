import { RemoteDiscussionFetchedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordRemoteDiscussionFetched = (state: Readmodel, event: RemoteDiscussionFetchedEvent): void => {
  const discussionId = event.data.id
  const existing = state.discussionsByEntryId.get(discussionId)
  if (existing !== undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  state.discussionsByEntryId.set(discussionId, {
    id: event.data.id,
    workId: '',
    collectionId: '',
    addedAt: event.data.attributes.addedAt,
    title: event.data.attributes.title,
    commentsCount: event.data.attributes.commentsCount,
  })
}

