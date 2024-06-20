import { allCollections, lookupCollection, lookupEntry } from './decorate'
import { Authority } from '../auth/authority'
import { Domain } from '../domain/index.open'
import { Queries } from '../unrestricted-domain'

export const instantiate = (authority: Authority, unrestrictedDomain: Queries): Domain => ({
  ...unrestrictedDomain,
  allCollections: allCollections(unrestrictedDomain, authority),
  lookupCollection: lookupCollection(unrestrictedDomain, authority),
  lookupEntry: lookupEntry(unrestrictedDomain, authority),
})

