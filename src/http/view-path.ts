import { QueryHandler } from './query-handler'
import { Queries } from '../unrestricted-domain'

export type ViewPath = {
  path: string,
  view: (queries: Queries) => QueryHandler,
}

