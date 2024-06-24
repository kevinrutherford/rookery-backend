import * as E from 'fp-ts/Either'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a non-existent collection', () => {
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)
  const collectionId = arbitraryWord()

  describe('doi-entered', () => {
    const eventId = arbitraryWord()
    const event = mkEvent('doi-entered', {
      id: eventId,
      workId: arbitraryWord(),
      collectionId,
    })
    handleEvent(event)

    it('does not record the Work', () => {
      expect(domain.allWorks()).toHaveLength(0)
    })

    it('does not record the Entry', () => {
      expect(domain.lookupEntry(eventId)).toStrictEqual(E.left('not-found'))
    })

    it('does not record the Activity', () => {
      expect(domain.getLocalTimeline()).toHaveLength(0)
    })

    it('reports the event as unexpected', () => {
      expect(domain.info().unexpectedEvents).toHaveLength(1)
    })
  })

})

