import { ResourceIdentifier } from './resource-identifier'

export const renderAccountIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'account',
  id,
})

