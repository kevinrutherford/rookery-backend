export type Activity = {
  type: 'activity',
  id: string,
  actor: string,
  occurred_at: Date,
  action: string,
  content: string,
}

