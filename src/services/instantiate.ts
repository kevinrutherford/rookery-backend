import { getCollection } from './collection/collection'
import { getCollections } from './collection/collections'
import { getCommunity } from './community/community'
import { getEntry } from './entry/entry'
import { getRoot } from './root/root'
import { getLocalTimeline } from './timeline/local'
import { pathToCommunity } from './ui-links'
import { getWorks } from './work/works'
import { ServicePath } from '../http/index.open'

export const instantiate = (): ReadonlyArray<ServicePath> => [
  {
    path: '/',
    service: getRoot,
  },
  {
    path: pathToCommunity(),
    service: getCommunity,
  },
  {
    path: '/collections',
    service: getCollections,
  },
  {
    path: '/collections/:id',
    service: getCollection,
  },
  {
    path: '/entries/:id',
    service: getEntry,
  },
  {
    path: '/timelines/local',
    service: getLocalTimeline,
  },
  {
    path: '/works',
    service: getWorks,
  },
]
