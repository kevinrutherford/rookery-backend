import { clientCanAccessCollection } from './client-can-access-collection'
import { Authority } from '../auth/authority'
import { Update } from '../domain/index.open'

export const clientCanSeeActivity = (claims: Authority) => (activity: Update): boolean => {
  switch (activity.type) {
    case 'comment-created':
      return clientCanAccessCollection(claims)(activity.occurredWithinPrivateCollection)
    case 'doi-entered':
      return clientCanAccessCollection(claims)(activity.occurredWithinPrivateCollection)
    case 'update:front-matter-found':
    case 'update:work-not-found':
      return claims('browse-works')
    default:
      return true
  }
}

