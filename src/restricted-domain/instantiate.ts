import {
  allCollections,
  allWorks,
  getLocalTimeline,
  lookupCollection,
  lookupEntry,
  lookupWork,
} from './decorate'
import { Authority } from '../auth/authority'
import { Domain } from '../domain/index.open'

export const instantiate = (authority: Authority, unrestrictedDomain: Domain): Domain => ({
  ...unrestrictedDomain,
  allCollections: allCollections(unrestrictedDomain, authority),
  allWorks: allWorks(unrestrictedDomain, authority),
  getLocalTimeline: getLocalTimeline(unrestrictedDomain, authority),
  lookupCollection: lookupCollection(unrestrictedDomain, authority),
  lookupEntry: lookupEntry(unrestrictedDomain, authority),
  lookupWork: lookupWork(unrestrictedDomain, authority),
})

