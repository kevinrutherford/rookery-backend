import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'
import { ParagraphRenderer } from './paragraph-renderer'

const CommentCreated = t.type({
  content: t.string,
})

export const renderCommentCreated: ParagraphRenderer = (event) => pipe(
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

