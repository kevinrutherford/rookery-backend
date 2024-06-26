import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('unrecognised event', () => {
  const { queries, handleEvent } = UnrestrictedDomain.instantiate(() => {})
  handleEvent(mkEvent('garbage', {
    something: arbitraryWord(),
  }))

  it('reports the event as unrecognised', () => {
    expect(queries.info().unrecognisedEvents).toHaveLength(1)
  })

  it('counts the event as processed', () => {
    expect(queries.info().eventsCount).toBe(1)
  })
})

