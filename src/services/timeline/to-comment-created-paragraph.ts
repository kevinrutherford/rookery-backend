import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { UpdateWithIncludes } from './update-with-includes'
import { CommentCreated, Domain } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'

export const toCommentCreatedParagraph = (queries: Domain, activity: CommentCreated): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'activity',
      id: activity.id,
      accountId: 'you',
      action: 'commented',
      content: activity.content,
      occurred_at: activity.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: pipe(
    [
      includeAccount(queries, activity.actor),
    ],
    RA.compact,
  ),
})

