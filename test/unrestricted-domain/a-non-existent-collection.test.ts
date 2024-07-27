import * as E from 'fp-ts/Either'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a non-existent collection', () => {
  const { queries, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)
  const collectionId = arbitraryWord()

  describe('doi-entered', () => {
    const entryId = arbitraryWord()
    const event = mkEvent('doi-entered', {
      actorId: arbitraryString(),
      entryId,
      doi: arbitraryWord(),
      collectionId,
    })
    handleEvent(event)

    it('does not record the Work', () => {
      expect(queries.allWorks()).toHaveLength(0)
    })

    it('does not record the Entry', () => {
      expect(queries.lookupEntry(entryId)).toStrictEqual(E.left('not-found'))
    })

    it('does not record the Activity', () => {
      expect(queries.getLocalTimeline()).toHaveLength(0)
    })

    it('reports the event as unexpected', () => {
      expect(queries.info().unexpectedEvents).toHaveLength(1)
    })
  })

})

