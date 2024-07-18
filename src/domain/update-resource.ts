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
  actor: string,
  occurredWithinPrivateCollection: boolean,
}

export type CommunityCreated = UpdateCommonAttributes & {
  type: 'update:community-created',
  communityId: string,
}

export type CollectionCreated = UpdateCommonAttributes & {
  type: 'collection-created',
  name: string,
}

export type CommentCreated = UpdateCommonAttributes & {
  type: 'comment-created',
  content: string,
  entryId: string,
}

export type DoiEntered = UpdateCommonAttributes & {
  type: 'doi-entered',
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

