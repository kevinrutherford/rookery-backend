import { getAbout } from './get-about'
import { getCollections } from './get-collections'
import { View } from './view'

export type Views = {
  getAbout: View,
  getCollections: View,
}

export const instantiate = (): Views => ({
  getAbout: getAbout(),
  getCollections: getCollections(),
})
