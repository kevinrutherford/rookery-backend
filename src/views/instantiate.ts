import { getAbout } from './get-about'
import { getCollection } from './get-collection'
import { getCollections } from './get-collections'
import { getEntry } from './get-entry'
import { View } from './view'
import { Queries } from '../readmodels/queries'

export type Views = {
  getAbout: View,
  getCollection: View,
  getEntry: View,
  getCollections: View,
}

export const instantiate = (queries: Queries): Views => ({
  getAbout: getAbout(),
  getCollection: getCollection(),
  getEntry: getEntry(),
  getCollections: getCollections(queries),
})
