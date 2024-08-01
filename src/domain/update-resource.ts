export type Update =
  | CommunityCreated
  | CollectionCreated
  | CommentCreated
  | DoiEntered
  | FrontMatterFound
  | WorkNotFound

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
}

export type FrontMatterFound = UpdateCommonAttributes & {
  type: 'update:front-matter-found',
  workId: string,
  title: string, // SMELL -- these 3 attributes form a DataClump
  abstract: string, // SMELL -- these 3 attributes form a DataClump
  authors: Array<string>, // SMELL -- these 3 attributes form a DataClump
}

export type WorkNotFound = UpdateCommonAttributes & {
  type: 'update:work-not-found',
  workId: string,
}

