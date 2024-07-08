import { clientCanAccessCollection } from './client-can-access-collection'
import { Authority } from '../auth/authority'
import { Update } from '../domain/index.open'

export const clientCanSeeUpdate = (claims: Authority) => (update: Update): boolean => {
  switch (update.type) {
    case 'comment-created':
      return clientCanAccessCollection(claims)(update.occurredWithinPrivateCollection)
    case 'doi-entered':
      return clientCanAccessCollection(claims)(update.occurredWithinPrivateCollection)
    case 'update:front-matter-found':
    case 'update:work-not-found':
      return claims('browse-works')
    default:
      return true
  }
}

