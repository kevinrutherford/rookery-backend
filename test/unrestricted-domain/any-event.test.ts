import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('any event', () => {
  const observer = jest.fn()
  const { queries, handleEvent } = UnrestrictedDomain.instantiate(observer)

  beforeEach(() => {
    handleEvent(mkEvent('doi-entered', {
      id: arbitraryWord(),
      actorId: arbitraryString(),
      workId: arbitraryWord(),
      collectionId: arbitraryWord(),
    }))
  })

  it('counts the event as processed', () => {
    expect(queries.info().eventsCount).toBe(1)
  })

  it('invokes the observer, to inform it about the state change', () => {
    expect(observer).toHaveBeenCalled()
  })
})

