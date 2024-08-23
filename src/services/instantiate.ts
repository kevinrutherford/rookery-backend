import { getCollection } from './collection/collection'
import { getCollections } from './collection/collections'
import { getCommunity } from './community/community'
import { getDiscussion } from './discussion/discussion'
import { getDiscussions } from './discussion/discussions'
import { getMember } from './member/member'
import { getMembers } from './member/members'
import { getRoot } from './root/root'
import { ServicePath } from './service-path'
import { getFollowedTimeline } from './timeline/followed'
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
    path: '/discussions',
    service: getDiscussions,
  },
  {
    path: '/discussions/:id',
    service: getDiscussion,
  },
  {
    path: '/members',
    service: getMembers,
  },
  {
    path: '/members/:id',
    service: getMember,
  },
  {
    path: '/timelines/followed',
    service: getFollowedTimeline,
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
