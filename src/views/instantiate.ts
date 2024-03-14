import { getAbout } from './get-about'
import { getCollection } from './get-collection'
import { getCollections } from './get-collections'
import { getEntry } from './get-entry'
import { ViewPath } from '../http/index.open'
import { Queries } from '../readmodels'

export const instantiate = (queries: Queries): ReadonlyArray<ViewPath> => [
  { path: '/about', view: getAbout() },
  { path: '/collections', view: getCollections(queries) },
  { path: '/collections/:id', view: getCollection(queries) },
  { path: '/entries/:id', view: getEntry(queries) },
]
