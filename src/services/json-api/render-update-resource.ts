import { JsonApiResource } from './json-api-resource'
import { renderUpdateIdentifier } from './render-update-identifier'
import { Activity } from '../../domain/index.open'

export const renderUpdateResource = (activity: Activity): JsonApiResource => ({
  ...renderUpdateIdentifier(activity.id),
  attributes: {
    actor: activity.actor,
    action: activity.action,
    content: activity.content,
    timestamp: activity.timestamp.toISOString(),
  },
})

