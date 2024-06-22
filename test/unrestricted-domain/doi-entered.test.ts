import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('doi-entered event', () => {
  describe('when the collection does not exist', () => {
    const { domain, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)
    handleEvent(mkEvent('doi-entered', {
      id: arbitraryWord(),
      workId: arbitraryWord(),
      collectionId: arbitraryWord(),
    }))

    it('does not record the Work', () => {
      expect(domain.allWorks()).toHaveLength(0)
    })

    it.failing('does not record the activity', () => {
      expect(domain.getLocalTimeline()).toHaveLength(0)
    })

    it('reports the event as unexpected', () => {
      expect(domain.info().unexpectedEvents).toHaveLength(1)
    })
  })
})

