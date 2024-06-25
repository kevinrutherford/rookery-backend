import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a private collection', () => {
  let domain: ReturnType<typeof UnrestrictedDomain.instantiate>
  const collectionId = arbitraryWord()

  const addEntry = () => {
    domain.handleEvent(mkEvent('doi-entered', {
      id: arbitraryWord(),
      workId: arbitraryWord(),
      collectionId,
    }))
  }

  const becomePrivate = () => {
    domain.handleEvent(mkEvent('collection-updated', {
      collectionId,
      attributes: {
        isPrivate: true,
      },
    }))
  }

  beforeEach(() => {
    domain = UnrestrictedDomain.instantiate(defaultTestObserver)
    domain.handleEvent(mkEvent('collection-created', {
      id: collectionId,
      name: arbitraryString(),
      description: arbitraryString(),
    }))
    becomePrivate()
  })

  describe('when doi-entered', () => {
    beforeEach(() => {
      addEntry()
    })

    it('the activity is recorded as private', () => {
      const activities = domain.queries.getLocalTimeline()
      expect(activities).toHaveLength(2)
      expect(activities[1].isPrivate).toBe(true)
    })
  })

  describe('with an entry', () => {

    beforeEach(() => {
      addEntry() // SMELL: need to test all kinds of activity
    })

    describe('when collection-updated to become public', () => {
      let activities: ReturnType<typeof domain.queries.getLocalTimeline>

      const becomePublic = () => {
        domain.handleEvent(mkEvent('collection-updated', {
          collectionId,
          attributes: {
            isPrivate: false,
          },
        }))
      }

      beforeEach(() => {
        becomePublic()
        activities = domain.queries.getLocalTimeline()
      })

      it('all activities are in the timeline', () => {
        expect(activities).toHaveLength(2)
      })

      it('all activities during the private period remain private', () => {
        expect(activities[1].isPrivate).toBe(true)
      })
    })
  })

})

