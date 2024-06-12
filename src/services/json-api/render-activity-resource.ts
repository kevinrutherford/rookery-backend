import { JsonApiResource } from './json-api-resource'
import { renderActivityIdentifier } from './render-activity-identifier'
import { Activity } from '../activity-resource'

export const renderActivityResource = (para: Activity): JsonApiResource => ({
  ...renderActivityIdentifier(`local-${para.timestamp}`),
  attributes: {
    ...para,
    timestamp: para.timestamp.toISOString(),
  },
})

