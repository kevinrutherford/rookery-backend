import * as E from 'fp-ts/Either'
import { Json } from 'io-ts-types'
import { ErrorOutcome } from './error-outcome'
import { Authority } from '../auth/authority'

export type QueryHandler = (clientCan: Authority) => (input: unknown) => E.Either<ErrorOutcome, Json>

