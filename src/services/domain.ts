import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Collection } from './collection-resource'
import { Comment } from './comment-resource'
import { Community } from './community-resource'
import { Entry } from './entry-resource'
import { FrontMatter } from '../unrestricted-domain/domain-event'
import { TimelineEvent } from '../unrestricted-domain/local-timeline/readmodel' // SMELL

type Work = {
  id: string,
  updatedAt: Date,
  frontMatter: FrontMatter,
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

export type Domain = {
  allCollections: () => ReadonlyArray<Collection>,
  allWorks: () => ReadonlyArray<Work>,
  findComments: (entryId: string) => ReadonlyArray<Comment>,
  findEntries: (collectionId: string) => ReadonlyArray<Entry>,
  getCommunity: () => O.Option<Community>,
  getLocalTimeline: (includePrivateCollectionActivities: boolean) => ReadonlyArray<TimelineEvent>,
  lookupCollection: (collectionId: string) => E.Either<'not-found', Collection>,
  lookupEntry: (collectionId: string) => O.Option<Entry>,
  lookupWork: (id: string) => O.Option<Work>,
}

