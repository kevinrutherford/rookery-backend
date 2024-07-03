import { JsonApiResource } from './json-api-resource'
import { renderCommunityIdentifier } from './render-community-identifier'
import { renderUpdateIdentifier } from './render-update-identifier'
import { Activity } from '../../domain/index.open'

export const renderUpdateResource = (update: Activity): JsonApiResource => {
  switch (update.type) {
    case 'update:community-created':
      return ({
        type: update.type,
        id: update.id,
        attributes: {
          actor: update.actor,
          occurred_at: update.occurred_at.toISOString(),
        },
        relationships: {
          community: { data: renderCommunityIdentifier(update.communityId) },
        },
      })
    default:
      return ({
        ...renderUpdateIdentifier(update.id),
        attributes: {
          actor: update.actor,
          action: update.action,
          content: update.content,
          occurred_at: update.occurred_at.toISOString(),
        },
      })
  }
}

