import { allCollections } from './decorate'
import { Authority } from '../auth/authority'
import { Queries } from '../unrestricted-domain'

export const instantiate = (authority: Authority, unrestrictedDomain: Queries): Queries => ({
  ...unrestrictedDomain,
  allCollections: allCollections(unrestrictedDomain)(authority),
})

