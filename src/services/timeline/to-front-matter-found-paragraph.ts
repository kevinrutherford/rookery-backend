import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { UpdateWithIncludes } from './update-with-includes'
import { FrontMatterFound } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'

export const toFrontMatterFoundParagraph = (update: FrontMatterFound): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'activity',
      id: update.id,
      accountId: update.actor,
      action: 'found the title of a paper',
      content: update.title, // SMELL -- the Work should be linked via a relationship
      occurred_at: update.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: [],
})

