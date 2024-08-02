import { getCollection } from './collection/collection'
import { getCollections } from './collection/collections'
import { getCommunity } from './community/community'
import { getEntry } from './entry/entry'
import { getMember } from './member/member'
import { getRoot } from './root/root'
import { ServicePath } from './service-path'
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
    path: '/members/:id',
    service: getMember,
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
