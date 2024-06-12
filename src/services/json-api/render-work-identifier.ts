import { ResourceIdentifier } from './resource-identifier'

export const renderWorkIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'work',
  id,
})

