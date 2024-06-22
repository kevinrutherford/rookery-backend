import { formatValidationErrors } from 'io-ts-reporters'
import * as Logger from '../src/logger'
import { DomainObserver } from '../src/unrestricted-domain/index.open'

export const dummyReporter: DomainObserver = (msg) => (errors) => {
  Logger.instantiate().warn(msg, {
    errors: formatValidationErrors(errors),
  })
}

