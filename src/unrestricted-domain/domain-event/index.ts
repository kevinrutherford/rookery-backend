import * as t from 'io-ts'
import { collectionCreatedEvent } from './collection-created'
import { collectionUpdatedEvent } from './collection-updated'
import { commentCreatedEvent } from './comment-created'
import { communityCreatedEvent } from './community-created'
import { discussionStartedEvent } from './discussion-started'
import { esEventBase } from './eventstore-event-base'
import { inboxCommentCreatedEvent } from './inbox-comment-created'
import { inboxMemberFollowedMemberEvent } from './inbox-member-followed-member'
import { memberJoinedEvent } from './member-joined'
import { remoteDiscussionFetchedEvent } from './remote-discussion-fetched'
import { remoteMemberFetchedEvent } from './remote-member-fetched'
import { workUpdatedEvent } from './work-updated'

export type CommunityCreatedEvent = t.TypeOf<typeof communityCreatedEvent>

export type CollectionCreatedEvent = t.TypeOf<typeof collectionCreatedEvent>

export type CollectionUpdatedEvent = t.TypeOf<typeof collectionUpdatedEvent>

export type CommentCreatedEvent = t.TypeOf<typeof commentCreatedEvent>

export type DoiEnteredEvent = t.TypeOf<typeof discussionStartedEvent>

export type MemberJoinedEvent = t.TypeOf<typeof memberJoinedEvent>

export type RemoteDiscussionFetchedEvent = t.TypeOf<typeof remoteDiscussionFetchedEvent>

export type RemoteMemberFetchedEvent = t.TypeOf<typeof remoteMemberFetchedEvent>

export type WorkUpdatedEvent = t.TypeOf<typeof workUpdatedEvent>

export type FrontMatter = t.TypeOf<typeof workUpdatedEvent>['data']['attributes']

export type InboxCommentCreatedEvent = t.TypeOf<typeof inboxCommentCreatedEvent>

export type InboxMemberFollowedMemberEvent = t.TypeOf<typeof inboxMemberFollowedMemberEvent>

export const domainEvent = t.union([
  communityCreatedEvent,
  collectionCreatedEvent,
  collectionUpdatedEvent,
  commentCreatedEvent,
  discussionStartedEvent,
  memberJoinedEvent,
  remoteDiscussionFetchedEvent,
  remoteMemberFetchedEvent,
  workUpdatedEvent,
  inboxCommentCreatedEvent,
])

export type DomainEvent = t.TypeOf<typeof esEventBase> & t.TypeOf<typeof domainEvent>

