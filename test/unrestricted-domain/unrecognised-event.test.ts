import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('unrecognised event', () => {
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)
  handleEvent(mkEvent('garbage', {
    something: arbitraryWord(),
  }))

  it('reports the event as unrecognised', () => {
    expect(domain.info().unrecognisedEvents).toHaveLength(1)
  })

  it('counts the event as processed', () => {
    expect(domain.info().eventsCount).toBe(1)
  })
})

