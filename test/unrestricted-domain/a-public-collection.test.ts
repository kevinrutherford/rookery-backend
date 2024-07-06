import { Domain } from '../../src/domain/index.open'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a public collection', () => {
  const collectionId = arbitraryWord()
  const workId = arbitraryWord()

  let d: Domain
  let h: UnrestrictedDomain.EventHandler

  beforeEach(() => {
    const { queries, handleEvent } = UnrestrictedDomain.instantiate(defaultTestObserver)
    d = queries
    h = handleEvent
    h(mkEvent('collection-created', {
      id: collectionId,
      name: arbitraryString(),
      description: arbitraryString(),
    }))
  })

  describe('that has no entries', () => {
    describe('when doi-entered', () => {
      beforeEach(() => {
        const doiEntered = mkEvent('doi-entered', {
          id: arbitraryWord(),
          workId,
          collectionId,
        })
        h(doiEntered)
      })

      it('records a new activity', () => {
        expect(d.getLocalTimeline()).toHaveLength(2)
      })

      it('records the activity as public', () => {
        expect(d.getLocalTimeline()[1].occurredWithinPrivateCollection).toBe(false)
      })

      it('records the new Work', () => {
        expect(d.allWorks()).toHaveLength(1)
        expect(d.allWorks()[0].id).toStrictEqual(workId)
      })
    })

    describe('when comment-created', () => {
      beforeEach(() => {
        h(mkEvent('comment-created', {
          id: arbitraryWord(),
          entryId: arbitraryWord(),
          content: arbitraryString(),
        }))
      })

      it('records an unexpected event', () => {
        expect(d.info().unexpectedEvents).toHaveLength(1)
      })

      it('does not record a new activity', () => {
        expect(d.getLocalTimeline()).toHaveLength(1)
      })
    })
  })

  describe('that has one entry', () => {
    const entryId = arbitraryWord()

    beforeEach(() => {
      h(mkEvent('doi-entered', {
        id: entryId,
        workId,
        collectionId,
      }))
    })

    it('there are two public activities in the timeline', () => {
      expect(d.getLocalTimeline()).toHaveLength(2)
    })

    describe('when comment-created on the entry', () => {

      beforeEach(() => {
        h(mkEvent('comment-created', {
          id: arbitraryWord(),
          entryId,
          content: arbitraryString(),
        }))
      })

      it('a new activity is recorded', () => {
        expect(d.getLocalTimeline()).toHaveLength(3)
        expect(d.getLocalTimeline()[2].type).toBe('comment-created')
      })

      it('records the commenting activity as private', () => {
        expect(d.getLocalTimeline()[2].occurredWithinPrivateCollection).toBe(false)
      })
    })
  })
})

