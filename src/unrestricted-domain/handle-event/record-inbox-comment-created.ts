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
  })
}

