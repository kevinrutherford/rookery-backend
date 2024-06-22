import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('any event', () => {
  const observer = jest.fn()
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(observer)

  beforeEach(() => {
    handleEvent(mkEvent('doi-entered', {
      id: arbitraryWord(),
      workId: arbitraryWord(),
      collectionId: arbitraryWord(),
    }))
  })

  it('counts the event as processed', () => {
    expect(domain.info().eventsCount).toBe(1)
  })

  it('invokes the observer, to inform it about the state change', () => {
    expect(observer).toHaveBeenCalled()
  })
})

