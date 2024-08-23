import { allCollections } from './all-collections'
import { allDiscussions } from './all-discussions'
import { allMembers } from './all-members'
import { allWorks } from './all-works'
import { collectionsContainingWork } from './collections-containing-work'
import { findComments } from './find-comments'
import { findDiscussions } from './find-discussions'
import { findDiscussionsAboutWork } from './find-discussions-about-work'
import { getCommunity } from './get-community'
import { getFollowedTimeline } from './get-followed-timeline'
import { getLocalTimeline } from './get-local-timeline'
import { lookupCollection } from './lookup-collection'
import { lookupDiscussion } from './lookup-discussion'
import { lookupMember } from './lookup-member'
import { lookupWork } from './lookup-work'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const instantiate = (currentState: Readmodel): Domain => ({
  allCollections: allCollections(currentState),
  allDiscussions: allDiscussions(currentState),
  allMembers: allMembers(currentState),
  allWorks: allWorks(currentState),
  collectionsContainingWork: collectionsContainingWork(currentState),
  findComments: findComments(currentState),
  findDiscussionsAboutWork: findDiscussionsAboutWork(currentState),
  findDiscussions: findDiscussions(currentState),
  getCommunity: getCommunity(currentState),
  getCollection: lookupCollection(currentState),
  getFollowedTimeline: getFollowedTimeline(currentState),
  getLocalTimeline: getLocalTimeline(currentState),
  info: () => currentState.info,
  lookupMember: lookupMember(currentState),
  lookupCollection: lookupCollection(currentState),
  lookupDiscussion: lookupDiscussion(currentState),
  lookupWork: lookupWork(currentState),
})

