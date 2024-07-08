import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Collection } from './collection-resource'
import { Comment } from './comment-resource'
import { Community } from './community-resource'
import { Entry } from './entry-resource'
import { Work } from './work-resource'

export type Update =
  | CommunityCreated
  | CollectionCreated
  | CommentCreated
  | DoiEntered
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

export type WorkUpdated = UpdateCommonAttributes & {
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
  getLocalTimeline: () => ReadonlyArray<Update>,
  lookupCollection: (collectionId: string) => E.Either<DomainError, Collection>,
  lookupEntry: (entryId: string) => E.Either<DomainError, Entry>,
  lookupWork: (id: string) => E.Either<DomainError, Work>,
  info: () => DomainProbe,
}

