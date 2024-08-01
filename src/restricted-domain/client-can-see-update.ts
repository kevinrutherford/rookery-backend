import { workIsEnteredInSomePublicCollection } from './work-is-entered-in-some-public-collection'
import { Authority } from '../auth/authority'
import { Domain, Update } from '../domain/index.open'

export const clientCanSeeUpdate = (claims: Authority, queries: Domain) => (update: Update): boolean => {
  if (claims('browse-private-collections'))
    return true
  switch (update.type) {
    case 'update:comment-created':
    case 'update:doi-entered':
      return !(update.occurredWithinPrivateCollection)
    case 'update:front-matter-found':
    case 'update:work-not-found':
      return workIsEnteredInSomePublicCollection(queries)(update.workId)
    default:
      return true
  }
}

