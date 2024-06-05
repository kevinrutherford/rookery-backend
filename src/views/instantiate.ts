import { getCollection } from './collection/collection'
import { getCollections } from './collection/collections'
import { getCommunity } from './community/community'
import { pathToCommunity } from './community/path-to-community'
import { getEntry } from './entry/entry'
import { getRoot } from './root/root'
import { getLocalTimeline } from './timeline/local'
import { getWorks } from './work/works'
import { Queries } from '../domain-model'
import { ViewPath } from '../http/index.open'

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
