import { ResourceIdentifier } from './resource-identifier'

export const renderDiscussionIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'discussion',
  id,
})

