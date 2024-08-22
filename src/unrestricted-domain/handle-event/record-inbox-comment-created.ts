import { InboxCommentCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordInboxCommentCreated = (state: Readmodel, event: InboxCommentCreatedEvent): void => {
  state.inbox.push({
    kind: 'inbox-update:comment-created',
    id: event.data.id,
    created: event.data.publishedAt,
    actorId: event.data.actorId,
    discussionId: event.data.entryId,
    occurredWithinPrivateCollection: false,
    discussion: {
      id: event.data.entryId,
      collectionId: 'poisons',
      workId: '10.7554%2Felife.80483',
      addedAt: new Date(),
      title: 'Unknown',
      commentsCount: 0, // SMELL -- should not be needed for the feed
    },
  })
}

