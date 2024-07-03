import { ResourceIdentifier } from './resource-identifier'

export const renderUpdateIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'update',
  id,
})

