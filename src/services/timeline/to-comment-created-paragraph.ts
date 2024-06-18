import * as O from 'fp-ts/Option'
import { Activity } from '../activity-resource'
import { CommentCreated } from '../domain/domain'

export const toCommentCreatedParagraph = (event: CommentCreated): O.Option<Activity> => O.some({
  userHandle: 'you',
  action: 'commented',
  content: event.data.content,
  timestamp: event.created,
})

