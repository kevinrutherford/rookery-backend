import * as O from 'fp-ts/Option'
import { CommentCreated } from '../../domain/index.open'
import { Activity } from '../activity-resource'

export const toCommentCreatedParagraph = (event: CommentCreated): O.Option<Activity> => O.some({
  id: event.id,
  userHandle: 'you',
  action: 'commented',
  content: event.data.content,
  timestamp: event.created,
})

