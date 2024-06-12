import { getCollection } from './collection/collection'
import { getCollections } from './collection/collections'
import { getCommunity } from './community/community'
import { getEntry } from './entry/entry'
import { getRoot } from './root/root'
import { getLocalTimeline } from './timeline/local'
import { pathToCommunity } from './ui-links'
import { getWorks } from './work/works'
import { ViewPath } from '../http/index.open'

export const instantiate = (): ReadonlyArray<ViewPath> => [
  {
    path: '/',
    view: getRoot,
  },
  {
    path: pathToCommunity(),
    view: getCommunity,
  },
  {
    path: '/collections',
    view: getCollections,
  },
  {
    path: '/collections/:id',
    view: getCollection,
  },
  {
    path: '/entries/:id',
    view: getEntry,
  },
  {
    path: '/timelines/local',
    view: getLocalTimeline,
  },
  {
    path: '/works',
    view: getWorks,
  },
]
