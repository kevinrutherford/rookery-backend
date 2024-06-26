import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a private collection with an entry', () => {
  let domain: ReturnType<typeof UnrestrictedDomain.instantiate>
  const collectionId = arbitraryWord()
  const entryId = arbitraryWord()

  const addEntry = () => {
    domain.handleEvent(mkEvent('doi-entered', {
      id: entryId,
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
    addEntry()
  })

  let activities: ReturnType<typeof domain.queries.getLocalTimeline>

  describe('when comment-created on the entry', () => {

    beforeEach(() => {
      domain.handleEvent(mkEvent('comment-created', {
        id: arbitraryWord(),
        entryId,
        content: arbitraryString(),
      }))
      activities = domain.queries.getLocalTimeline()
    })

    it('a new activity is recorded', () => {
      expect(activities).toHaveLength(3)
    })

    it.failing('records the commenting activity as private', () => {
      expect(activities[2].isPrivate).toBe(true)
    })
  })
})

