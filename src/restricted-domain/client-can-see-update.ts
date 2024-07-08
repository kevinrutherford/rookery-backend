import { Authority } from '../auth/authority'
import { Update } from '../domain/index.open'

export const clientCanSeeUpdate = (claims: Authority) => (update: Update): boolean => {
  if (claims('browse-private-collections'))
    return true
  switch (update.type) {
    case 'comment-created':
    case 'doi-entered':
      return !(update.occurredWithinPrivateCollection)
    case 'update:front-matter-found':
    case 'update:work-not-found':
      return !(update.occurredWithinPrivateCollection)
    default:
      return true
  }
}

