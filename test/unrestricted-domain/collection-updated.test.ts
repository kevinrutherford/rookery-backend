import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a public collection', () => {
  let domain: ReturnType<typeof UnrestrictedDomain.instantiate>
  const actorId = arbitraryWord()
  const collectionId = arbitraryWord()

  const addDiscussion = () => {
    domain.handleEvent(mkEvent('discussion-started', {
      actorId,
      discussionId: arbitraryWord(),
      doi: arbitraryWord(),
      collectionId,
    }))
  }

  const becomePrivate = () => {
    domain.handleEvent(mkEvent('collection-updated', {
      actorId,
      collectionId,
      attributes: {
        isPrivate: true,
      },
    }))
  }

  const becomePublic = () => {
    domain.handleEvent(mkEvent('collection-updated', {
      actorId,
      collectionId,
      attributes: {
        isPrivate: false,
      },
    }))
  }

  beforeEach(() => {
    domain = UnrestrictedDomain.instantiate(defaultTestObserver)
    domain.handleEvent(mkEvent('member-joined', {
      id: actorId,
      username: arbitraryWord(),
      displayName: arbitraryWord(),
      avatarUrl: arbitraryWord(),
    }))
    domain.handleEvent(mkEvent('collection-created', {
      id: collectionId,
      actorId,
      name: arbitraryString(),
      description: arbitraryString(),
    }))
    addDiscussion()
  })

  describe('when collection-updated to become private', () => {
    let activities: ReturnType<typeof domain.queries.getLocalTimeline>

    beforeEach(() => {
      becomePrivate()
      addDiscussion()
      activities = domain.queries.getLocalTimeline()
    })

    it('no new activity is recorded', () => {
      expect(activities).toHaveLength(3)
    })

    it('all activities during the public period remain public', () => {
      expect(activities[0].occurredWithinPrivateCollection).toBe(false)
      expect(activities[1].occurredWithinPrivateCollection).toBe(false)
    })

    it('subsequent activities are private', () => {
      expect(activities[2].occurredWithinPrivateCollection).toBe(true)
    })
  })

  describe('when a private collection becomes public', () => {
    let activities: ReturnType<typeof domain.queries.getLocalTimeline>

    beforeEach(() => {
      becomePrivate()
      addDiscussion() // SMELL: need to test all kinds of activity
      becomePublic()
      addDiscussion()
      activities = domain.queries.getLocalTimeline()
    })

    it('all activities are in the timeline', () => {
      expect(activities).toHaveLength(4)
    })

    it('all activities during the private period remain private', () => {
      expect(activities[2].occurredWithinPrivateCollection).toBe(true)
    })
  })
})

