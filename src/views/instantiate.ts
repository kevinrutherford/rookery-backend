import { getAbout } from './get-about'
import { getCollection } from './get-collection'
import { getCollectionMember } from './get-collection-member'
import { getCollections } from './get-collections'
import { View } from './view'
import { allCollections } from '../readmodels/all-collections'

export type Views = {
  getAbout: View,
  getCollection: View,
  getCollectionMember: View,
  getCollections: View,
}

export const instantiate = (): Views => ({
  getAbout: getAbout(),
  getCollection: getCollection(),
  getCollectionMember: getCollectionMember(),
  getCollections: getCollections({
    allCollections,
  }),
})
