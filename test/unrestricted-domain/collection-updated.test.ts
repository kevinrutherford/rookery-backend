import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('collection-updated', () => {
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

  const becomePublic = () => {
    domain.handleEvent(mkEvent('collection-updated', {
      collectionId,
      attributes: {
        isPrivate: false,
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
    addEntry()
  })

  describe('when a public collection becomes private', () => {
    let activities: ReturnType<typeof domain.queries.getLocalTimeline>

    beforeEach(() => {
      becomePrivate()
      addEntry()
      activities = domain.queries.getLocalTimeline()
    })

    it('all activities are in the timeline', () => {
      expect(activities).toHaveLength(3)
    })

    it('all activities during the public period remain public', () => {
      expect(activities[0].isPrivate).toBe(false)
      expect(activities[1].isPrivate).toBe(false)
    })

    it('subsequent activities are private', () => {
      expect(activities[2].isPrivate).toBe(true)
    })
  })

  describe('when a private collection becomes public', () => {
    let activities: ReturnType<typeof domain.queries.getLocalTimeline>

    beforeEach(() => {
      becomePrivate()
      addEntry() // SMELL: need to test all kinds of activity
      becomePublic()
      addEntry()
      activities = domain.queries.getLocalTimeline()
    })

    it('all activities are in the timeline', () => {
      expect(activities).toHaveLength(4)
    })

    it('all activities during the private period remain private', () => {
      expect(activities[2].isPrivate).toBe(true)
    })

    it('subsequent activities are public', () => {
      expect(activities[3].isPrivate).toBe(false)
    })
  })
})

