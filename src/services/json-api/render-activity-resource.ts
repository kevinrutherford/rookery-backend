import { JsonApiResource } from './json-api-resource'
import { renderActivityIdentifier } from './render-activity-identifier'
import { Activity } from '../activity-resource'

export const renderActivityResource = (activity: Activity): JsonApiResource => ({
  ...renderActivityIdentifier(activity.id),
  attributes: {
    ...activity,
    timestamp: activity.timestamp.toISOString(),
  },
})

