import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('any event', () => {
  const observer = jest.fn()
  const { queries, handleEvent } = UnrestrictedDomain.instantiate(observer)

  beforeEach(() => {
    handleEvent(mkEvent('discussion-started', {
      id: arbitraryWord(),
      actorId: arbitraryWord(),
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

