import { ResourceIdentifier } from './resource-identifier'

export const renderFollowerIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'follower',
  id,
})

