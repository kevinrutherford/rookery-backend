import { Domain } from '../src/domain/index.open'
import { DomainObserver } from '../src/unrestricted-domain/index.open'

export const defaultTestObserver: DomainObserver = (domain: Domain) => {
  const info = domain.info()
  if (info.unrecognisedEvents.length > 0)
    throw new Error(`Unrecognised event: ${JSON.stringify(info.unrecognisedEvents)}`)
}

