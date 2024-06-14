import * as E from 'fp-ts/Either'
import { Json } from 'io-ts-types'
import { ErrorOutcome } from './error-outcome'
import { Authority } from '../auth/authority'
import { Queries } from '../unrestricted-domain'

type Service = (clientCan: Authority) => (input: unknown) => E.Either<ErrorOutcome, Json>

export type ServicePath = {
  path: string,
  service: (queries: Queries) => Service,
}

