import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { includeEntry } from './include-entry'
import { includeWork } from './include-work'
import { UpdateWithIncludes } from './update-with-includes'
import { CommentCreated, Domain } from '../../domain/index.open'
import { renderCommentCreatedUpdateResource } from '../json-api/render-comment-created-update-resource'

export const toCommentCreatedParagraph = (queries: Domain, update: CommentCreated): UpdateWithIncludes => ({
  data: O.some(renderCommentCreatedUpdateResource(update)),
  included: pipe(
    [
      includeAccount(queries, update.actorId),
      includeEntry(queries, update.entryId),
      includeWork(queries, update.workId),
    ],
    RA.compact,
  ),
})

