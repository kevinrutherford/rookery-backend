import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { UpdateWithIncludes } from './update-with-includes'
import { CollectionCreated, Domain } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'

export const toCollectionCreatedParagraph = (queries: Domain, activity: CollectionCreated): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'activity',
      id: activity.id,
      accountId: activity.actorId,
      action: `created collection ${activity.name}`,
      content: '',
      occurred_at: activity.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: pipe(
    [
      includeAccount(queries, activity.actorId),
    ],
    RA.compact,
  ),
})

