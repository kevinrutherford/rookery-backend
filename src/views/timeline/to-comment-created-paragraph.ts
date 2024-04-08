import * as O from 'fp-ts/Option'
import { TimelineParagraph } from './timeline-paragraph'
import { CommentCreated } from '../../readmodels/local-timeline/readmodel'

export const toCommentCreatedParagraph = (event: CommentCreated): O.Option<TimelineParagraph> => O.some({
  userHandle: 'you',
  action: 'commented',
  content: event.data.content,
  timestamp: event.created,
})

