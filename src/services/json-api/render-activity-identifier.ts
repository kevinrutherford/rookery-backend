import { ResourceIdentifier } from './resource-identifier'

export const renderActivityIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'timeline-paragraph',
  id,
})

