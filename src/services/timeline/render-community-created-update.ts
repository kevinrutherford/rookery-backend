import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { UpdateWithIncludes } from './update-with-includes'
import { CommunityCreated, Domain } from '../../domain/index.open'
import { renderCommunity } from '../json-api/render-community'
import { renderUpdateResource } from '../json-api/render-update-resource'

const includeActor = (id: string) => O.some({
  type: 'account',
  id,
  attributes: {
    username: 'DonnaBramwell',
    display_name: 'Donna Bramwell',
    avatar_url: 'https://assets.website-files.com/6278ea240c19526063fea7fb/629384b3aefd5da66f82e759_DB.PNG',
  },
})

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
      includeActor(activity.actor),
      includeCommunity(queries),
    ],
    RA.compact,
  ),
})

