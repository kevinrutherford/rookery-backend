import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('collection-updated', () => {
  describe('when a public collection becomes private', () => {
    const collectionId = arbitraryWord()
    const { domain, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)
    handleEvent(mkEvent('collection-created', {
      id: collectionId,
      name: arbitraryString(),
      description: arbitraryString(),
    }))
    handleEvent(mkEvent('collection-updated', {
      collectionId,
      attributes: {
        isPrivate: true,
      },
    }))
    const activities = domain.getLocalTimeline()

    it('all earlier activities remain public', () => {
      expect(activities[0].isPrivate).toBe(false)
    })

    it.todo('all future activities are private')
  })

  describe('when a private collection becomes public', () => {
    it.todo('all earlier activities remain private')

    it.todo('all future activities are public')
  })
})

