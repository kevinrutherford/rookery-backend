import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { dummyReporter } from '../dummy-reporter'
import { arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('unrecognised event', () => {
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(dummyReporter)
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

