import { Authority } from '../auth/authority'

export const clientCanAccessCollection = (clientCan: Authority) => (isPrivate: boolean): boolean => (
  !isPrivate || clientCan('browse-private-collections')
)

