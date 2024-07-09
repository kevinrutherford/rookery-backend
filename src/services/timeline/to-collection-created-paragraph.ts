import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { UpdateWithIncludes } from './update-with-includes'
import { CollectionCreated } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'

export const toCollectionCreatedParagraph = (activity: CollectionCreated): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'activity',
      id: activity.id,
      actor: activity.actor,
      action: `created collection ${activity.name}`,
      content: '',
      occurred_at: activity.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: [],
})

