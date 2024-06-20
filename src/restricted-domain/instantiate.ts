import { allCollections, lookupCollection, lookupEntry } from './decorate'
import { Authority } from '../auth/authority'
import { Domain } from '../domain/index.open'

export const instantiate = (authority: Authority, unrestrictedDomain: Domain): Domain => ({
  ...unrestrictedDomain,
  allCollections: allCollections(unrestrictedDomain, authority),
  lookupCollection: lookupCollection(unrestrictedDomain, authority),
  lookupEntry: lookupEntry(unrestrictedDomain, authority),
})

