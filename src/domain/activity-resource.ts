type CommunityCreatedUpdate = {
  type: 'update:community-created',
  id: string,
  actor: string,
  occurred_at: Date,
  communityId: string,
}

export type WorkNotFoundUpdate = {
  type: 'update:work-not-found',
  id: string,
  actor: string,
  occurred_at: Date,
  workId: string,
}

type ClassicActivity = {
  type: 'activity',
  id: string,
  actor: string,
  occurred_at: Date,
  action: string,
  content: string,
}

export type Activity =
  | ClassicActivity
  | CommunityCreatedUpdate

