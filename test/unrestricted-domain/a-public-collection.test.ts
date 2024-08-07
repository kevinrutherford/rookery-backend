import { Domain } from '../../src/domain/index.open'
import { renderEntryIdentifier } from '../../src/services/json-api/render-entry-identifier'
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
      actorId: arbitraryWord(),
      name: arbitraryString(),
      description: arbitraryString(),
    }))
  })

  describe('that has no entries', () => {
    describe('when discussion-started', () => {
      const actorId = arbitraryWord() // SMELL -- need to configure the actor cache with this id
      const entryId = arbitraryWord()

      beforeEach(() => {
        const doiEntered = mkEvent('discussion-started', {
          actorId,
          entryId,
          doi: workId,
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

      it('records the actor as following the entry', () => {
        const actor = d.lookupMember(actorId)
        expect(actor.following[0]).toStrictEqual(renderEntryIdentifier(entryId))
      })
    })

    describe('when comment-created', () => {
      beforeEach(() => {
        h(mkEvent('comment-created', {
          id: arbitraryWord(),
          actorId: arbitraryWord(),
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
    const actorId = arbitraryWord()

    beforeEach(() => {
      h(mkEvent('discussion-started', {
        actorId,
        entryId,
        doi: workId,
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
          actorId,
          entryId,
          content: arbitraryString(),
        }))
      })

      it('a new activity is recorded', () => {
        expect(d.getLocalTimeline()).toHaveLength(3)
        expect(d.getLocalTimeline()[2].kind).toBe('update:comment-created')
      })

      it('records the commenting activity as private', () => {
        expect(d.getLocalTimeline()[2].occurredWithinPrivateCollection).toBe(false)
      })
    })

    describe('when the same actor adds another DOI', () => {
      beforeEach(() => {
        h(mkEvent('discussion-started', {
          actorId,
          entryId: arbitraryWord(),
          doi: arbitraryWord(),
          collectionId,
        }))
      })

      it('the actor is following both entries', () => {
        expect(d.lookupMember(actorId).following).toHaveLength(2)
      })
    })
  })
})

