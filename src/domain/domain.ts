import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Collection } from './collection-resource'
import { Comment } from './comment-resource'
import { Community } from './community-resource'
import { Entry } from './entry-resource'
import { Member } from './member-resource'
import { Update } from './update-resource'
import { Work } from './work-resource'

export type DomainProbe = {
  eventsCount: number,
  unexpectedEvents: Array<Record<string, unknown>>,
  unrecognisedEvents: Array<unknown>,
}

type DomainError = 'not-found' | 'not-authorised'

export type Domain = {
  allCollections: () => ReadonlyArray<Collection>,
  allWorks: () => ReadonlyArray<Work>,
  collectionsContainingWork: (workId: string) => ReadonlyArray<Collection>,
  findComments: (entryId: string) => ReadonlyArray<Comment>,
  findEntries: (collectionId: string) => ReadonlyArray<Entry>,
  getCommunity: () => O.Option<Community>,
  getLocalTimeline: () => ReadonlyArray<Update>,
  lookupMember: (accountId: string) => Member,
  lookupCollection: (collectionId: string) => E.Either<DomainError, Collection>,
  lookupEntry: (entryId: string) => E.Either<DomainError, Entry>,
  lookupWork: (id: string) => E.Either<DomainError, Work>,
  info: () => DomainProbe,
}

