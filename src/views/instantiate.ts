import { getCollection } from './collection/collection'
import { getCollections } from './collection/collections'
import { getCommunity } from './community/community'
import { pathToCommunity } from './community/path-to-community'
import { getEntries } from './entry/entries'
import { getEntry } from './entry/entry'
import { getRoot } from './root/root'
import { getLocalTimeline } from './timeline/local'
import { ViewPath } from './view'
import { getWorks } from './work/works'
import { Queries } from '../domain-model'

export const instantiate = (queries: Queries): ReadonlyArray<ViewPath> => [
  {
    path: '/',
    view: getRoot(queries),
  },
  {
    path: pathToCommunity(),
    view: getCommunity(queries),
  },
  {
    path: '/collections',
    view: getCollections(queries),
  },
  {
    path: '/collections/:id',
    view: getCollection(queries),
  },
  {
    path: '/entries',
    view: getEntries(queries),
  },
  {
    path: '/entries/:id',
    view: getEntry(queries),
  },
  {
    path: '/timelines/local',
    view: getLocalTimeline(queries),
  },
  {
    path: '/works',
    view: getWorks(queries),
  },
]
