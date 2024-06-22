import { JsonApiResource } from './json-api-resource'
import { renderActivityIdentifier } from './render-activity-identifier'
import { Activity } from '../../domain/index.open'

export const renderActivityResource = (activity: Activity): JsonApiResource => ({
  ...renderActivityIdentifier(activity.id),
  attributes: {
    ...activity,
    timestamp: activity.timestamp.toISOString(),
  },
})

