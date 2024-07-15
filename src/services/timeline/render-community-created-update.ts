import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { UpdateWithIncludes } from './update-with-includes'
import { CommunityCreated, Domain } from '../../domain/index.open'
import { renderAccount } from '../json-api/render-account'
import { renderCommunity } from '../json-api/render-community'
import { renderUpdateResource } from '../json-api/render-update-resource'

const includeAccount = (queries: Domain, accountId: string) => pipe(
  accountId,
  queries.lookupAccount,
  O.fromEither,
  O.map(renderAccount),
)

const includeCommunity = (queries: Domain) => pipe(
  queries.getCommunity(),
  O.map(renderCommunity),
)

export const renderCommunityCreatedUpdate = (queries: Domain, activity: CommunityCreated): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'update:community-created',
      id: activity.id,
      accountId: activity.actor,
      communityId: activity.communityId,
      occurred_at: activity.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: pipe(
    [
      includeAccount(queries, activity.actor),
      includeCommunity(queries),
    ],
    RA.compact,
  ),
})

