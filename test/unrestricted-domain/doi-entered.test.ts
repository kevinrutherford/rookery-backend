import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('doi-entered', () => {
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)

  describe('when the collection is public', () => {
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

  describe('when the collection is private', () => {
    it.todo('does not record the activity')
  })
})

