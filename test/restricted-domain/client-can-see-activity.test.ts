import * as RestrictedDomain from '../../src/restricted-domain'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a client with no privileges', () => {
  const claims = () => false
  const unrestrictedDomain = UnrestrictedDomain.instantiate(defaultTestObserver)
  const restrictedQueries = RestrictedDomain.instantiate(claims, unrestrictedDomain.queries)
  const handleEvent = unrestrictedDomain.handleEvent

  describe('when community-created', () => {
    it.todo('the activity is visible')
  })

  describe('when collection-created (public)', () => {
    it.todo('the activity is visible')
  })

  describe('when collection-created (private)', () => {
    it.todo('the activity is not visible')
  })

  describe('when doi-entered (in a public collection)', () => {
    const collectionId = arbitraryWord()

    beforeEach(() => {
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
    })

    it('the activity is visible', () => {
      const activities = restrictedQueries.getLocalTimeline()
      expect(activities).toHaveLength(2)
    })
  })

  describe('when doi-entered (in a private collection)', () => {
    it.todo('the activity is not visible')
  })

  describe('when comment-created (in a public collection)', () => {
    it.todo('the activity is visible')
  })

  describe('when comment-created (in a private collection)', () => {
    it.todo('the activity is not visible')
  })

  describe('when work-updated', () => {
    it.todo('the activity is not visible')
  })
})

describe('given a client with browse-private-collections privilege', () => {
  describe('when community-created', () => {
    it.todo('the activity is visible')
  })

  describe('when collection-created (public)', () => {
    it.todo('the activity is visible')
  })

  describe('when collection-created (private)', () => {
    it.todo('the activity is visible')
  })

  describe('when doi-entered (in a public collection)', () => {
    it.todo('the activity is visible')
  })

  describe('when doi-entered (in a private collection)', () => {
    it.todo('the activity is visible')
  })

  describe('when comment-created (in a public collection)', () => {
    it.todo('the activity is visible')
  })

  describe('when comment-created (in a private collection)', () => {
    it.todo('the activity is visible')
  })

  describe('when work-updated', () => {
    it.todo('the activity is not visible')
  })
})

describe('given a client with receive-work-updates privilege', () => {
  describe('when community-created', () => {
    it.todo('the activity is visible')
  })

  describe('when collection-created (public)', () => {
    it.todo('the activity is visible')
  })

  describe('when collection-created (private)', () => {
    it.todo('the activity is not visible')
  })

  describe('when doi-entered (in a public collection)', () => {
    it.todo('the activity is visible')
  })

  describe('when doi-entered (in a private collection)', () => {
    it.todo('the activity is not visible')
  })

  describe('when comment-created (in a public collection)', () => {
    it.todo('the activity is visible')
  })

  describe('when comment-created (in a private collection)', () => {
    it.todo('the activity is not visible')
  })

  describe('when work-updated', () => {
    it.todo('the activity is visible')
  })
})

