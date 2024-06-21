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
    name: t.string,
    affiliation: t.string,
    overview: t.array(t.string),
  }),
})])

const collectionCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('collection-created'),
  data: t.type({
    id: t.string,
    name: t.string,
    description: t.string,
  }),
})])

const collectionUpdatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('collection-updated'),
  data: t.type({
    collectionId: t.string,
    attributes: t.type({
      isPrivate: t.boolean,
    }),
  }),
})])

const commentCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('comment-created'),
  data: t.type({
    id: t.string,
    entryId: t.string,
    content: t.string,
  }),
})])

const doiEnteredEvent = t.intersection([esEventBase, t.type({
  type: t.literal('doi-entered'),
  data: t.type({
    id: t.string,
    workId: t.string,
    collectionId: t.string,
  }),
})])

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

const workUpdated = t.intersection([esEventBase, t.type({
  type: t.literal('work-updated'),
  data: t.type({
    workId: t.string,
    attributes: t.union([frontMatterFound, frontMatterNotFound, frontMatterNotDetermined]),
  }),
})])

export type FrontMatter = t.TypeOf<typeof workUpdated>['data']['attributes']

export const domainEvent = t.union([
  communityCreatedEvent,
  collectionCreatedEvent,
  collectionUpdatedEvent,
  commentCreatedEvent,
  doiEnteredEvent,
  workUpdated,
])

export type DomainEvent = {
  id: string,
  created: Date,
} & t.TypeOf<typeof domainEvent>

