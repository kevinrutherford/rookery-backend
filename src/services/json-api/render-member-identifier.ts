import { ResourceIdentifier } from './resource-identifier'

export const renderMemberIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'member',
  id,
})

