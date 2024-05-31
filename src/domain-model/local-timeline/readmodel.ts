import { Work } from '../works/work'

export type CollectionCreated = {
  type: 'collection-created',
  created: Date,
  isPrivate: boolean,
  data: {
    id: string,
    name: string,
    description: string,
  },
}

export type CommentCreated = {
  type: 'comment-created',
  created: Date,
  isPrivate: boolean,
  data: {
    id: string,
    entryId: string,
    content: string,
  },
}

export type DoiEntered = {
  type: 'doi-entered',
  created: Date,
  isPrivate: boolean,
  data: {
    id: string,
    workId: string,
    collectionId: string,
  },
}

export type WorkUpdated = {
  type: 'work-updated',
  created: Date,
  isPrivate: boolean,
  data: {
    workId: string,
    attributes: Work['frontMatter'],
  },
}

export type TimelineEvent =
  | CollectionCreated
  | CommentCreated
  | DoiEntered
  | WorkUpdated

export type Readmodel = Array<{
  event: TimelineEvent,
}>

