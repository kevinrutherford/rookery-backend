import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

export type Community = {
  id: string,
  name: string,
  affiliation: string,
  overview: ReadonlyArray<string>,
}

export type Collection = {
  id: string,
  name: string,
  description: string,
  isPrivate: boolean,
}

export type Entry = {
  id: string,
  workId: string,
  collectionId: string,
  addedAt: Date,
  commentsCount: number,
}

export type Comment = {
  id: string,
  entryId: string,
  content: string,
  createdAt: Date,
}

/*
type FrontMatterNotDetermined = {
  crossrefStatus: 'not-determined',
  reason: 'never-fetched' | 'response-invalid' | 'response-unavailable',
}

type FrontMatterNotFound = {
  crossrefStatus: 'not-found',
}

type FrontMatterFound = {
  crossrefStatus: 'found',
  title: string,
  abstract: string,
  authors: ReadonlyArray<string>,
}

type FrontMatter = {
  workId: string,
  attributes: FrontMatterFound | FrontMatterNotFound | FrontMatterNotDetermined,
}

type Work = {
  id: string,
  updatedAt: Date,
  frontMatter: FrontMatter,
}

type WorkUpdated = {
  type: 'work-updated',
  created: Date,
  isPrivate: boolean,
  data: {
    workId: string,
    attributes: Work['frontMatter'],
  },
}

type TimelineEvent =
  | CollectionCreated
  | CommentCreated
  | DoiEntered
  | WorkUpdated

*/

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

export type Queries = {
  allCollections: () => ReadonlyArray<Collection>,
  // allWorks: () => ReadonlyArray<Work>,
  findComments: (entryId: string) => ReadonlyArray<Comment>,
  findEntries: (collectionId: string) => ReadonlyArray<Entry>,
  getCommunity: () => O.Option<Community>,
  // getLocalTimeline: (includePrivateCollectionActivities: boolean) => ReadonlyArray<TimelineEvent>,
  lookupCollection: (collectionId: string) => E.Either<'not-found', Collection>,
  lookupEntry: (collectionId: string) => O.Option<Entry>,
  // lookupWork: (id: string) => O.Option<Work>,
}
