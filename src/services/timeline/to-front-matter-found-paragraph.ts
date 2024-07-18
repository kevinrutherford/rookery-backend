import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, FrontMatterFound } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'

export const toFrontMatterFoundParagraph = (queries: Domain, update: FrontMatterFound): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'activity',
      id: update.id,
      accountId: update.actorId,
      action: 'found the title of a paper',
      content: update.title, // SMELL -- the Work should be linked via a relationship
      occurred_at: update.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: pipe(
    [
      includeAccount(queries, update.actorId),
    ],
    RA.compact,
  ),
})

