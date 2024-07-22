import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { includeEntry } from './include-entry'
import { includeWork } from './include-work'
import { UpdateWithIncludes } from './update-with-includes'
import { CommentCreated, Domain } from '../../domain/index.open'
import { renderCommentCreatedUpdateResource } from '../json-api/render-comment-created-update-resource'

export const toCommentCreatedParagraph = (queries: Domain, activity: CommentCreated): UpdateWithIncludes => ({
  data: pipe(
    activity,
    renderCommentCreatedUpdateResource,
    O.some,
  ),
  included: pipe(
    [
      includeAccount(queries, activity.actorId),
      includeEntry(queries, activity.entryId),
      includeWork(queries, activity.workId),
    ],
    RA.compact,
  ),
})

