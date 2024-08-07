type UpdateCommonAttributes = {
  id: string,
  created: Date,
  actorId: string,
  occurredWithinPrivateCollection: boolean,
}

export type CommunityCreated = UpdateCommonAttributes & {
  kind: 'update:community-created',
  communityId: string,
}

export type CollectionCreated = UpdateCommonAttributes & {
  kind: 'update:collection-created',
  collectionId: string,
}

export type CommentCreated = UpdateCommonAttributes & {
  kind: 'update:comment-created',
  content: string,
  entryId: string,
  workId: string,
}

export type DoiEntered = UpdateCommonAttributes & {
  kind: 'update:doi-entered',
  workId: string,
  collectionId: string,
  entryId: string,
}

export type FrontMatterFetched = UpdateCommonAttributes & {
  kind: 'update:front-matter-found',
  workId: string,
}

export type WorkNotFound = UpdateCommonAttributes & {
  kind: 'update:work-not-found',
  workId: string,
}

export type Update =
  | CollectionCreated
  | CommentCreated
  | CommunityCreated
  | DoiEntered
  | FrontMatterFetched
  | WorkNotFound

