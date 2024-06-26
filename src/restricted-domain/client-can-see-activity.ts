import { Authority } from '../auth/authority'
import { Activity } from '../domain/domain'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const clientCanSeeActivity = (claims: Authority) => (activity: Activity): boolean => true

