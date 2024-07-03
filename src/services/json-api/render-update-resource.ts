import { JsonApiResource } from './json-api-resource'
import { renderUpdateIdentifier } from './render-update-identifier'
import { Activity } from '../../domain/index.open'

export const renderUpdateResource = (activity: Activity): JsonApiResource => {
  switch (activity.type) {
    case 'update:community-created':
      return ({
        type: activity.type,
        id: activity.id,
        attributes: {
          actor: activity.actor,
          action: activity.action,
          summary: activity.summary,
          occurred_at: activity.occurred_at.toISOString(),
        },
        relationships: {
          community: { data: { type: 'community', id: 'xxx' } },
        },
      })
    default:
      return ({
        ...renderUpdateIdentifier(activity.id),
        attributes: {
          actor: activity.actor,
          action: activity.action,
          content: activity.content,
          occurred_at: activity.occurred_at.toISOString(),
        },
      })
  }
}

