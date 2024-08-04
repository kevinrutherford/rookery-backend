import { allCollections } from './all-collections'
import { allWorks } from './all-works'
import { collectionsContainingWork } from './collections-containing-work'
import { findComments } from './find-comments'
import { findEntries } from './find-entries'
import { getCommunity } from './get-community'
import { getLocalTimeline } from './get-local-timeline'
import { lookupCollection } from './lookup-collection'
import { lookupEntry } from './lookup-entry'
import { lookupMember } from './lookup-member'
import { lookupWork } from './lookup-work'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const instantiate = (currentState: Readmodel): Domain => ({
  allCollections: allCollections(currentState),
  allWorks: allWorks(currentState),
  collectionsContainingWork: collectionsContainingWork(currentState),
  findComments: findComments(currentState),
  findEntries: findEntries(currentState),
  getCommunity: getCommunity(currentState),
  getCollection: lookupCollection(currentState),
  getLocalTimeline: getLocalTimeline(currentState),
  info: () => currentState.info,
  lookupMember: lookupMember(currentState),
  lookupCollection: lookupCollection(currentState),
  lookupEntry: lookupEntry(currentState),
  lookupWork: lookupWork(currentState),
})

