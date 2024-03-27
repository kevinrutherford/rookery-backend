import { Collection } from '../../readmodels/collections/collection'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderCollection = (collection: Collection) => ({
  type: 'collection',
  id: collection.id,
  attributes: {
    description: collection.description,
    handle: collection.handle,
    name: collection.name,
  },
})

