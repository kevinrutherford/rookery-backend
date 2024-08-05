import { recordCollectionCreated } from './record-collection-created'
import { recordCollectionUpdated } from './record-collection-updated'
import { recordCommentCreated } from './record-comment-created'
import { recordCommunityCreated } from './record-community-created'
import { recordDoiEntered } from './record-doi-entered'
import { recordWorkUpdated } from './record-work-updated'
import { DomainEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const dispatch = (state: Readmodel) => (event: DomainEvent): void => {
  switch (event.type) {
    case 'collection-created':
      recordCollectionCreated(state, event)
      break
    case 'collection-updated':
      recordCollectionUpdated(state, event)
      break
    case 'comment-created':
      recordCommentCreated(state, event)
      break
    case 'community-created':
      recordCommunityCreated(state, event)
      break
    case 'discussion-started':
      recordDoiEntered(state, event)
      break
    case 'work-updated':
      recordWorkUpdated(state, event)
      break
  }
}

