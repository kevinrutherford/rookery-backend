type CommentCreatedUpdate = {
  type: 'update:comment-created',
  id: string,
  accountId: string,
  occurred_at: Date,
  content: string,
  entryId: string,
}

type CommunityCreatedUpdate = {
  type: 'update:community-created',
  id: string,
  accountId: string,
  occurred_at: Date,
  communityId: string,
}

type ClassicActivity = {
  type: 'activity',
  id: string,
  accountId: string,
  occurred_at: Date,
  action: string,
  content: string,
}

export type Activity =
  | ClassicActivity
  | CommentCreatedUpdate
  | CommunityCreatedUpdate

