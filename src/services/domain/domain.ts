import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Collection } from './collection-resource'
import { Comment } from './comment-resource'
import { Community } from './community-resource'
import { Entry } from './entry-resource'
import { Work } from './work-resource'

export type WorkUpdated = {
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

type DomainError = 'not-found' | 'not-authorised'

export type Domain = {
  allCollections: () => ReadonlyArray<Collection>,
  allWorks: () => ReadonlyArray<Work>,
  findComments: (entryId: string) => ReadonlyArray<Comment>,
  findEntries: (collectionId: string) => ReadonlyArray<Entry>,
  getCommunity: () => O.Option<Community>,
  getLocalTimeline: (includePrivateCollectionActivities: boolean) => ReadonlyArray<TimelineEvent>,
  lookupCollection: (collectionId: string) => E.Either<DomainError, Collection>,
  lookupEntry: (collectionId: string) => O.Option<Entry>,
  lookupWork: (id: string) => O.Option<Work>,
}

