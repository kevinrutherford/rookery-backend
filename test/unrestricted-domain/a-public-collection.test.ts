import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a public collection', () => {
  describe('doi-entered', () => {
    const { domain, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)

    const collectionId = arbitraryWord()
    handleEvent(mkEvent('collection-created', {
      id: collectionId,
      name: arbitraryString(),
      description: arbitraryString(),
    }))
    handleEvent(mkEvent('doi-entered', {
      id: arbitraryWord(),
      workId: arbitraryWord(),
      collectionId,
    }))

    it('records the activity', () => {
      expect(domain.getLocalTimeline()).toHaveLength(2)
    })
  })
})

