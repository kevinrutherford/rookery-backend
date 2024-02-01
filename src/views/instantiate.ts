import { getCollections } from './box/list-missing-cards'
import { View } from './view'

export type Views = {
  getCollections: View,
}

export const instantiate = (): Views => ({
  getCollections: getCollections(),
})
