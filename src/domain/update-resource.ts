type UpdateCommonAttributes = {
  id: string,
  created: Date,
  actorId: string,
  occurredWithinPrivateCollection: boolean,
}

type CommunityCreated = UpdateCommonAttributes & {
  type: 'update:community-created',
  communityId: string,
}

type CollectionCreated = UpdateCommonAttributes & {
  type: 'update:collection-created',
  collectionId: string,
}

export type CommentCreated = UpdateCommonAttributes & {
  type: 'update:comment-created',
  content: string,
  entryId: string,
  workId: string,
}

type DoiEntered = UpdateCommonAttributes & {
  type: 'update:doi-entered',
  workId: string,
  collectionId: string,
  entryId: string,
}

export type FrontMatterFetched = UpdateCommonAttributes & {
  type: 'update:front-matter-found',
  workId: string,
}

export type WorkNotFound = UpdateCommonAttributes & {
  type: 'update:work-not-found',
  workId: string,
}

export type Update =
  | CollectionCreated
  | CommentCreated
  | CommunityCreated
  | DoiEntered
  | FrontMatterFetched
  | WorkNotFound

