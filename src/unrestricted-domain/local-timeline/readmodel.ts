import { Work } from '../works/work'

type CollectionCreated = {
  type: 'collection-created',
  id: string,
  created: Date,
  isPrivate: boolean,
  data: {
    id: string,
    name: string,
    description: string,
  },
}

type CommentCreated = {
  type: 'comment-created',
  id: string,
  created: Date,
  isPrivate: boolean,
  data: {
    id: string,
    entryId: string,
    content: string,
  },
}

type DoiEntered = {
  type: 'doi-entered',
  id: string,
  created: Date,
  isPrivate: boolean,
  data: {
    id: string,
    workId: string,
    collectionId: string,
  },
}

type WorkUpdated = {
  type: 'work-updated',
  id: string, // SMELL -- duplicated domain object types
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

