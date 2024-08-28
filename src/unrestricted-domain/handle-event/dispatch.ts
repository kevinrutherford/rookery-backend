import { recordCollectionCreated } from './record-collection-created'
import { recordCollectionUpdated } from './record-collection-updated'
import { recordCommentCreated } from './record-comment-created'
import { recordCommunityCreated } from './record-community-created'
import { recordDiscussionStarted } from './record-discussion-started'
import { recordInboxCommentCreated } from './record-inbox-comment-created'
import { recordInboxMemberFollowedMember } from './record-inbox-member-followed-member'
import { recordMemberJoined } from './record-member-joined'
import { recordRemoteDiscussionFetched } from './record-remote-discussion-fetched'
import { recordRemoteMemberFetched } from './record-remote-member-fetched'
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
      recordDiscussionStarted(state, event)
      break
    case 'member-joined':
      recordMemberJoined(state, event)
      break
    case 'remote-discussion-fetched':
      recordRemoteDiscussionFetched(state, event)
      break
    case 'remote-member-fetched':
      recordRemoteMemberFetched(state, event)
      break
    case 'work-updated':
      recordWorkUpdated(state, event)
      break
    case 'inbox:comment-created':
      recordInboxCommentCreated(state, event)
      break
    case 'inbox:member-followed-member':
      recordInboxMemberFollowedMember(state, event)
      break
  }
}

