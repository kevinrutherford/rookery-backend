type CollectionCreated = {
  type: 'collection-created',
  created: Date,
  data: {
    id: string,
    handle: string,
    name: string,
    description: string,
  },
}

type CommentCreated = {
  type: 'comment-created',
  created: Date,
  data: {
    id: string,
    entryId: string,
    content: string,
  },
}

type DoiEntered = {
  type: 'doi-entered',
  created: Date,
  data: {
    id: string,
    workId: string,
    collectionId: string,
  },
}

export type TimelineEvent =
  | CollectionCreated
  | CommentCreated
  | DoiEntered

export type Readmodel = Array<TimelineEvent>

