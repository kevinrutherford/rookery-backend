import * as O from 'fp-ts/Option'
import { Activity, CommentCreated } from '../../domain/index.open'

// SMELL: this should be done in the domain
export const toCommentCreatedParagraph = (event: CommentCreated): O.Option<Activity> => O.some({
  id: event.id,
  actor: 'you',
  action: 'commented',
  content: event.data.content,
  timestamp: event.created,
})

