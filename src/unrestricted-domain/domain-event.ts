import * as t from 'io-ts'
import * as tt from 'io-ts-types'

const esEventBase = t.type({
  id: tt.NonEmptyString,
  created: tt.date,
})

const communityCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('community-created'),
  data: t.type({
    id: t.string,
    actorId: t.string,
    name: t.string,
    affiliation: t.string,
    overview: t.array(t.string),
    theme: t.string,
  }),
})])

export type CommunityCreatedEvent = t.TypeOf<typeof communityCreatedEvent>

const collectionCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('collection-created'),
  data: t.type({
    id: t.string,
    actorId: t.string,
    name: t.string,
    description: t.string,
  }),
})])

export type CollectionCreatedEvent = t.TypeOf<typeof collectionCreatedEvent>

const collectionUpdatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('collection-updated'),
  data: t.type({
    actorId: t.string,
    collectionId: t.string,
    attributes: t.type({
      isPrivate: t.boolean,
    }),
  }),
})])

export type CollectionUpdatedEvent = t.TypeOf<typeof collectionUpdatedEvent>

const commentCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('comment-created'),
  data: t.type({
    id: t.string,
    actorId: t.string,
    entryId: t.string,
    content: t.string,
  }),
})])

export type CommentCreatedEvent = t.TypeOf<typeof commentCreatedEvent>

const doiEnteredEvent = t.intersection([esEventBase, t.type({
  type: t.literal('discussion-started'),
  data: t.type({
    actorId: t.string,
    entryId: t.string,
    doi: t.string,
    collectionId: t.string,
  }),
})])

export type DoiEnteredEvent = t.TypeOf<typeof doiEnteredEvent>

const frontMatterNotDetermined = t.type({
  crossrefStatus: t.literal('not-determined'),
  reason: t.union([
    t.literal('never-fetched'),
    t.literal('response-invalid'),
    t.literal('response-unavailable'),
  ]),
})

const frontMatterNotFound = t.type({
  crossrefStatus: t.literal('not-found'),
})

const frontMatterFound = t.type({
  crossrefStatus: t.literal('found'),
  title: t.string,
  abstract: t.string,
  authors: t.array(t.string),
})

const workUpdatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('work-updated'),
  data: t.type({
    actorId: t.string,
    workId: t.string,
    attributes: t.union([frontMatterFound, frontMatterNotFound, frontMatterNotDetermined]),
  }),
})])

export type WorkUpdatedEvent = t.TypeOf<typeof workUpdatedEvent>

export type FrontMatter = t.TypeOf<typeof workUpdatedEvent>['data']['attributes']

const inboxCommentCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('inbox:comment-created'),
  data: t.type({
    id: t.string,
    actorId: t.string,
    publishedAt: tt.DateFromISOString,
    entryId: t.string,
    content: t.string,
  }),
})])

export type InboxCommentCreatedEvent = t.TypeOf<typeof inboxCommentCreatedEvent>

export const domainEvent = t.union([
  communityCreatedEvent,
  collectionCreatedEvent,
  collectionUpdatedEvent,
  commentCreatedEvent,
  doiEnteredEvent,
  workUpdatedEvent,
  inboxCommentCreatedEvent,
])

export type DomainEvent = {
  id: string,
  created: Date,
} & t.TypeOf<typeof domainEvent>

