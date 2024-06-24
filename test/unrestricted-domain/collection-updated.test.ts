import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('collection-updated', () => {
  const { queries, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)
  const collectionId = arbitraryWord()

  describe('when a public collection becomes private', () => {
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
    handleEvent(mkEvent('collection-updated', {
      collectionId,
      attributes: {
        isPrivate: true,
      },
    }))
    const activities = queries.getLocalTimeline()

    it('all earlier activities remain public', () => {
      expect(activities[0].isPrivate).toBe(false)
      expect(activities[1].isPrivate).toBe(false)
    })
  })

  describe('when a private collection becomes public', () => {
    it.todo('all private activities remain private')
  })
})

