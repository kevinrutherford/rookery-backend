import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, WorkNotFound } from '../../domain/index.open'
import { renderWork } from '../json-api/render-work'
import { renderWorkNotFoundUpdateResource } from '../json-api/render-work-not-found-update-resource'

export const toWorkNotFoundParagraph = (queries: Domain, update: WorkNotFound): UpdateWithIncludes => ({
  data: pipe(
    update,
    renderWorkNotFoundUpdateResource,
    O.some,
  ),
  included: pipe(
    update.workId,
    queries.lookupWork,
    E.match(
      () => [],
      (work) => [renderWork(work)],
    ),
  ),
})

