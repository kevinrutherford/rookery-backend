import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'
import { TimelineParagraph } from './timeline-paragraph'
import { ErrorOutcome } from '../../http/index.open'
import { DomainEvent } from '../../readmodels/domain-event'

const CommentCreated = t.type({
  content: t.string,
})

export const renderCommentCreated = (event: DomainEvent): E.Either<ErrorOutcome, TimelineParagraph> => pipe(
  event.data,
  CommentCreated.decode,
  E.bimap(
    (errors) => ({
      category: 'bad-input',
      message: 'could not parse comment-created event payload',
      evidence: { event, errors: formatValidationErrors(errors) },
    }),
    (payload) => ({
      userHandle: 'you',
      action: 'commented',
      content: payload.content,
      timestamp: event.created,
    }),
  ),
)

