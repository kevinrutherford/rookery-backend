import { Work } from './works/work'

type ESEventBase = {
  created: Date,
}

type CommunityCreatedEvent = ESEventBase & {
  type: 'community-created',
  data: {
    id: string,
    name: string,
    affiliation: string,
    overview: ReadonlyArray<string>,
  }
}

type CollectionCreatedEvent = ESEventBase & {
  type: 'collection-created',
  data: {
    id: string,
    name: string,
    description: string,
  }
}

type CollectionUpdatedEvent = ESEventBase & {
  type: 'collection-updated',
  data: {
    collectionId: string,
    attributes: {
      isPrivate: boolean,
    },
  }
}

type CommentCreatedEvent = ESEventBase & {
  type: 'comment-created',
  data: {
    id: string,
    entryId: string,
    content: string,
  }
}

type DoiEnteredEvent = ESEventBase & {
  type: 'doi-entered',
  data: {
    id: string,
    workId: string,
    collectionId: string,
  }
}

type WorkUpdated = ESEventBase & {
  type: 'work-updated',
  data: {
    workId: string,
    attributes: Work['frontMatter'],
  }
}

export type DomainEvent =
  | CommunityCreatedEvent
  | CollectionCreatedEvent
  | CollectionUpdatedEvent
  | CommentCreatedEvent
  | DoiEnteredEvent
  | WorkUpdated

