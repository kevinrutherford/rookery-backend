import { formatValidationErrors } from 'io-ts-reporters'
import * as Logger from '../src/logger'
import { ReportFatalError } from '../src/unrestricted-domain'

export const dummyReporter: ReportFatalError = (msg) => (errors) => {
  Logger.instantiate().warn(msg, {
    errors: formatValidationErrors(errors),
  })
}

