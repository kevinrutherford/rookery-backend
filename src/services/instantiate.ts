import { getCollection } from './collection/collection'
import { getCollections } from './collection/collections'
import { getCommunity } from './community/community'
import { getEntry } from './entry/entry'
import { getRoot } from './root/root'
import { ServicePath } from './service-path'
import { getFederatedTimeline } from './timeline/federated'
import { getFollowingTimeline } from './timeline/following'
import { getLocalTimeline } from './timeline/local'
import { pathToCommunity } from './ui-links'
import { getWork } from './work/work'
import { getWorks } from './work/works'

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
    path: '/timelines/federated',
    service: getFederatedTimeline,
  },
  {
    path: '/timelines/following',
    service: getFollowingTimeline,
  },
  {
    path: '/timelines/local',
    service: getLocalTimeline,
  },
  {
    path: '/works',
    service: getWorks,
  },
  {
    path: '/works/:id',
    service: getWork,
  },
]
