import { Domain } from '../../src/domain/index.open'
import * as RestrictedDomain from '../../src/restricted-domain'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('client-can-see-activity', () => {
  let handleEvent: UnrestrictedDomain.EventHandler
  let unrestrictedQueries: Domain
  let restrictedQueries: Domain

  beforeEach(() => {
    const unrestrictedDomain = UnrestrictedDomain.instantiate(defaultTestObserver)
    handleEvent = unrestrictedDomain.handleEvent
    unrestrictedQueries = unrestrictedDomain.queries
  })

  describe('given a client with no privileges', () => {
    const claims = () => false

    beforeEach(() => {
      restrictedQueries = RestrictedDomain.instantiate(claims, unrestrictedQueries)
    })

    describe('when community-created', () => {
      it.todo('the activity is visible')
    })

    describe('when collection-created (public)', () => {
      const collectionId = arbitraryWord()

      beforeEach(() => {
        handleEvent(mkEvent('collection-created', {
          id: collectionId,
          name: arbitraryString(),
          description: arbitraryString(),
        }))
      })

      it('the activity is visible', () => {
        const activities = restrictedQueries.getLocalTimeline()
        expect(activities).toHaveLength(1)
        // SMELL: check details of the activity
      })
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
        // SMELL: check details of the second activity
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
})

