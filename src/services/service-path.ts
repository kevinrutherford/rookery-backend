import { Service } from './service'
import { Domain } from '../domain/index.open'

export type ServicePath = {
  path: string,
  service: (domain: Domain) => Service,
}

