import { getCollections } from './get-collections'
import { View } from './view'

export type Views = {
  getCollections: View,
}

export const instantiate = (): Views => ({
  getCollections: getCollections(),
})
