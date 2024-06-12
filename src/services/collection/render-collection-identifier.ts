import { ResourceIdentifier } from '../resource-identifier'

export const renderCollectionIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'collection',
  id,
})

