import { ResourceIdentifier } from '../resource-identifier'

export const renderEntryIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'entry',
  id,
})

