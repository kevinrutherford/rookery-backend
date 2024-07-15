import { JsonApiResource } from './json-api-resource'
import { renderAccountIdentifier } from './render-account-identifier'
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
          actor: update.actor, // SMELL -- should be an included resource
          occurred_at: update.occurred_at.toISOString(),
        },
        relationships: {
          actor: { data: renderAccountIdentifier(update.actor) },
          community: { data: renderCommunityIdentifier(update.communityId) },
        },
      })
    default:
      return ({
        ...renderUpdateIdentifier(update.id),
        attributes: {
          actor: update.actor, // SMELL -- should be an included resource
          action: update.action,
          content: update.content,
          occurred_at: update.occurred_at.toISOString(),
        },
        relationships: {
          actor: { data: renderAccountIdentifier(update.actor) },
        },
      })
  }
}

