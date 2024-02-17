import { getAbout } from './get-about'
import { getCollection } from './get-collection'
import { getCollections } from './get-collections'
import { View } from './view'

export type Views = {
  getAbout: View,
  getCollection: View,
  getCollections: View,
}

export const instantiate = (): Views => ({
  getAbout: getAbout(),
  getCollection: getCollection(),
  getCollections: getCollections(),
})
