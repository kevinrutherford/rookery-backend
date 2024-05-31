import { JSONType } from '@eventstore/db-client'
import { Work } from './works/work'

type ESEvent<Type extends string = string, Data extends JSONType = JSONType> = {
  type: Type;
  created: Date,
  data: Data;
}

type CommunityCreatedEvent = ESEvent<'community-created', {
  id: string,
  name: string,
  affiliation: string,
  overview: ReadonlyArray<string>,
}>

type CollectionCreatedEvent = ESEvent<'collection-created', {
  id: string,
  name: string,
  description: string,
}>

type CollectionUpdatedEvent = ESEvent<'collection-updated', {
  collectionId: string,
  attributes: {
    isPrivate: boolean,
  },
}>

type CommentCreatedEvent = ESEvent<'comment-created', {
  id: string,
  entryId: string,
  content: string,
}>

type DoiEnteredEvent = ESEvent<'doi-entered', {
  id: string,
  workId: string,
  collectionId: string,
}>

type WorkUpdated = ESEvent<'work-updated', {
  workId: string,
  attributes: Work['frontMatter'],
}>

export type DomainEvent =
  | CommunityCreatedEvent
  | CollectionCreatedEvent
  | CollectionUpdatedEvent
  | CommentCreatedEvent
  | DoiEnteredEvent
  | WorkUpdated

