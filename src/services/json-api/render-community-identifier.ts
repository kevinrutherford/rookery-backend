import { ResourceIdentifier } from './resource-identifier'

export const renderCommunityIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'community',
  id,
})

