import { Work } from './work'
import {
  CollectionCreated, CommentCreated, CommunityCreated, DoiEntered,
} from '../../domain/domain'

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

