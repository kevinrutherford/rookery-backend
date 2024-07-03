import { Work } from './work'
import { CommunityCreated } from '../../domain/domain'

type CollectionCreated = {
  type: 'collection-created',
  id: string,
  created: Date,
  actor: string,
  occurredWithinPrivateCollection: boolean,
  name: string,
}

type CommentCreated = {
  type: 'comment-created',
  id: string,
  created: Date,
  actor: string,
  occurredWithinPrivateCollection: boolean,
  content: string,
}

type DoiEntered = {
  type: 'doi-entered',
  id: string,
  created: Date,
  actor: string,
  occurredWithinPrivateCollection: boolean,
  workId: string,
  collectionId: string,
}

type WorkUpdated = {
  type: 'work-updated',
  id: string, // SMELL -- duplicated domain object types
  created: Date,
  actor: string,
  occurredWithinPrivateCollection: boolean,
  data: {
    workId: string,
    attributes: Work['frontMatter'],
  },
}

export type TimelineEvent =
  | CommunityCreated
  | CollectionCreated
  | CommentCreated
  | DoiEntered
  | WorkUpdated

