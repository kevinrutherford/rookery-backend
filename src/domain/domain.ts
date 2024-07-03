import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Collection } from './collection-resource'
import { Comment } from './comment-resource'
import { Community } from './community-resource'
import { Entry } from './entry-resource'
import { Work } from './work-resource'

/**
 * @deprecated The domain should expose Activities
 */
export type Activity =
  | CommunityCreated
  | CollectionCreated
  | CommentCreated
  | DoiEntered
  | WorkUpdated

type ActivityBase = {
  id: string,
  created: Date,
  actor: string,
  occurredWithinPrivateCollection: boolean,
}

/**
 * @deprecated The domain should expose Activities
 */
export type CommunityCreated = ActivityBase & {
  type: 'community-created',
  name: string,
}

/**
 * @deprecated The domain should expose Activities
 */
export type CollectionCreated = ActivityBase & {
  type: 'collection-created',
  name: string,
}

/**
 * @deprecated The domain should expose Activities
 */
export type CommentCreated = ActivityBase & {
  type: 'comment-created',
  content: string,
}

/**
 * @deprecated The domain should expose Activities
 */
export type DoiEntered = ActivityBase & {
  type: 'doi-entered',
  workId: string,
  collectionId: string,
}

/**
 * @deprecated The domain should expose Activities
 */
export type WorkUpdated = ActivityBase & {
  type: 'work-updated',
  data: {
    workId: string,
    attributes: Work['frontMatter'],
  },
}

export type DomainProbe = {
  eventsCount: number,
  unexpectedEvents: Array<Record<string, unknown>>,
  unrecognisedEvents: Array<unknown>,
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
  lookupEntry: (entryId: string) => E.Either<DomainError, Entry>,
  lookupWork: (id: string) => O.Option<Work>,
  info: () => DomainProbe,
}

