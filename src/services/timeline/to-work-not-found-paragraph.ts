import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { UpdateWithIncludes } from './update-with-includes'
import { WorkNotFound } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'

export const toWorkNotFoundParagraph = (update: WorkNotFound): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'update:work-not-found',
      id: update.id,
      actor: update.actor,
      occurred_at: update.created,
      workId: update.workId,
    },
    renderUpdateResource,
    O.some,
  ),
  included: [],
})

