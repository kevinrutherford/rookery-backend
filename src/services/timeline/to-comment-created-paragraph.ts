import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { UpdateWithIncludes } from './update-with-includes'
import { CommentCreated } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'

export const toCommentCreatedParagraph = (event: CommentCreated): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'activity',
      id: event.id,
      actor: 'you',
      action: 'commented',
      content: event.content,
      occurred_at: event.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: [],
})

