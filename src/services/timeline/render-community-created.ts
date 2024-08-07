import { includeCommunity } from './include-community'
import { includeMember } from './include-member'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain } from '../../domain/index.open'
import { CommunityCreated } from '../../domain/update-resource'
import { renderCommunityIdentifier } from '../json-api/render-community-identifier'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'

export const renderCommunityCreated = (queries: Domain, update: CommunityCreated): UpdateWithIncludes => ({
  data: {
    type: 'update:community-created',
    id: update.id,
    attributes: {
      occurred_at: update.created.toISOString(),
    },
    relationships: {
      actor: { data: renderMemberIdentifier(update.actorId) },
      community: { data: renderCommunityIdentifier(update.communityId) },
    },
  },
  included: [
    includeMember(queries, update.actorId),
    includeCommunity(queries),
  ],
})

