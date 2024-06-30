import { Authority } from '../auth/authority'
import { Activity } from '../domain/domain'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const clientCanSeeActivity = (claims: Authority) => (activity: Activity): boolean => {
  switch (activity.type) {
    case 'comment-created':
      return !activity.isPrivate || claims('browse-private-collections')
    case 'doi-entered':
      return !activity.isPrivate || claims('browse-private-collections')
    default:
      return true
  }
}

