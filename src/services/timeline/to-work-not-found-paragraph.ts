import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { includeWork } from './include-work'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, WorkNotFound } from '../../domain/index.open'
import { renderWorkNotFoundUpdateResource } from '../json-api/render-work-not-found-update-resource'

export const toWorkNotFoundParagraph = (queries: Domain, update: WorkNotFound): UpdateWithIncludes => ({
  data: pipe(
    update,
    renderWorkNotFoundUpdateResource,
    O.some,
  ),
  included: pipe(
    [
      includeWork(queries, update.workId),
      includeAccount(queries, update.actorId),
    ],
    RA.compact,
  ),
})

