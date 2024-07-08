import { Work } from './work-resource'

export type Update =
  | CommunityCreated
  | CollectionCreated
  | CommentCreated
  | DoiEntered
  | FrontMatterFound
  | WorkNotFound
  | WorkUpdated

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
  type: 'front-matter-found',
  workId: string,
}

export type WorkUpdated = UpdateCommonAttributes & {
  type: 'work-updated',
  data: {
    workId: string,
    attributes: Work['frontMatter'],
  },
}

