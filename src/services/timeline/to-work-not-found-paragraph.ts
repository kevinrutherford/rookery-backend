import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, WorkNotFound } from '../../domain/index.open'
import { renderWork } from '../json-api/render-work'
import { renderWorkNotFoundUpdateResource } from '../json-api/render-work-not-found-update-resource'

const includeWork = (queries: Domain, workId: string) => pipe(
  workId,
  queries.lookupWork,
  O.fromEither,
  O.map(renderWork),
)

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

