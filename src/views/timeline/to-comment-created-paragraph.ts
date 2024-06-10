import * as O from 'fp-ts/Option'
import { TimelineParagraph } from './timeline-paragraph'
import { CommentCreated } from '../queries'

export const toCommentCreatedParagraph = (event: CommentCreated): O.Option<TimelineParagraph> => O.some({
  userHandle: 'you',
  action: 'commented',
  content: event.data.content,
  timestamp: event.created,
})

