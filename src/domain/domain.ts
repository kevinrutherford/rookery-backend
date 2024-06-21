import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Collection } from './collection-resource'
import { Comment } from './comment-resource'
import { Community } from './community-resource'
import { Entry } from './entry-resource'
import { Work } from './work-resource'

export type WorkUpdated = {
  type: 'work-updated',
  id: string,
  created: Date,
  isPrivate: boolean,
  data: {
    workId: string,
    attributes: Work['frontMatter'],
  },
}

type Activity =
  | CollectionCreated
  | CommentCreated
  | DoiEntered
  | WorkUpdated

export type CollectionCreated = {
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

export type CommentCreated = {
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

export type DoiEntered = {
  type: 'doi-entered',
  id: string, // SMELL: duplicate event properties
  created: Date, // SMELL: duplicate event properties
  isPrivate: boolean, // SMELL: duplicate event properties
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
  getLocalTimeline: () => ReadonlyArray<Activity>,
  lookupCollection: (collectionId: string) => E.Either<DomainError, Collection>,
  lookupEntry: (collectionId: string) => E.Either<DomainError, Entry>,
  lookupWork: (id: string) => O.Option<Work>,
}

