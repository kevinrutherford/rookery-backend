import { QueryHandler } from './query-handler'
import { Queries } from '../domain-model'

export type ViewPath = {
  path: string,
  view: (queries: Queries) => QueryHandler,
}

