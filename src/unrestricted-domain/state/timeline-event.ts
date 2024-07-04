import {
  CollectionCreated, CommentCreated, CommunityCreated, DoiEntered, WorkUpdated,
} from '../../domain/domain'

export type TimelineEvent =
  | CommunityCreated
  | CollectionCreated
  | CommentCreated
  | DoiEntered
  | WorkUpdated

