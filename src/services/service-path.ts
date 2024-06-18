import { Service } from './service'
import { Queries } from '../unrestricted-domain'

export type ServicePath = {
  path: string,
  service: (queries: Queries) => Service,
}

