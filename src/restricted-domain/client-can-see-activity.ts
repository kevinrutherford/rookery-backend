import { clientCanAccessCollection } from './client-can-access-collection'
import { Authority } from '../auth/authority'
import { Activity } from '../domain/domain'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const clientCanSeeActivity = (claims: Authority) => (activity: Activity): boolean => {
  switch (activity.type) {
    case 'comment-created':
      return clientCanAccessCollection(claims)(activity.occurredWithinPrivateCollection)
    case 'doi-entered':
      return clientCanAccessCollection(claims)(activity.occurredWithinPrivateCollection)
    case 'work-updated':
      return claims('browse-works')
    default:
      return true
  }
}

