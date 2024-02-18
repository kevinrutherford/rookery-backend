import { getAbout } from './get-about'
import { getCollection } from './get-collection'
import { getCollectionMember } from './get-collection-member'
import { getCollections } from './get-collections'
import { View } from './view'

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
  getCollections: getCollections(),
})
