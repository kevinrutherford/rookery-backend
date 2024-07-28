import { JsonApiResource } from './json-api-resource'
import { renderCommunityIdentifier } from './render-community-identifier'
import { renderMemberIdentifier } from './render-member-identifier'
import { renderUpdateIdentifier } from './render-update-identifier'
import { Activity } from '../../domain/index.open'

export const renderUpdateResource = (update: Activity): JsonApiResource => {
  switch (update.type) {
    case 'update:community-created':
      return ({
        type: update.type,
        id: update.id,
        attributes: {
          occurred_at: update.occurred_at.toISOString(),
        },
        relationships: {
          actor: { data: renderMemberIdentifier(update.accountId) },
          community: { data: renderCommunityIdentifier(update.communityId) },
        },
      })
    default:
      return ({
        ...renderUpdateIdentifier(update.id),
        attributes: {
          action: update.action,
          content: update.content,
          occurred_at: update.occurred_at.toISOString(),
        },
        relationships: {
          actor: { data: renderMemberIdentifier(update.accountId) },
        },
      })
  }
}

