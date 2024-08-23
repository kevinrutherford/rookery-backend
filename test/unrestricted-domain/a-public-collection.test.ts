import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../src/domain/index.open'
import { renderDiscussionIdentifier } from '../../src/services/json-api/render-discussion-identifier'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord, shouldNotHappen } from '../helpers'
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

  describe('that has no discussions', () => {
    describe('when discussion-started', () => {
      const actorId = arbitraryWord() // SMELL -- need to configure the actor cache with this id
      const discussionId = arbitraryWord()

      beforeEach(() => {
        const doiEntered = mkEvent('discussion-started', {
          actorId,
          discussionId,
          doi: workId,
          collectionId,
        })
        h(doiEntered)
      })

      it('increments the discussion count', () => {
        const collection = pipe(
          d.getCollection(collectionId),
          E.getOrElseW(shouldNotHappen),
        )
        expect(collection.discussionCount).toBe(1)
      })

      it('starts the discussion with a title matching the DOI', () => {
        const discussion = pipe(
          d.lookupEntry(discussionId),
          E.getOrElseW(shouldNotHappen),
        )
        expect(discussion.title).toContain(workId)
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
        const member = pipe(
          actorId,
          d.lookupMember,
          E.getOrElseW(shouldNotHappen),
        )
        expect(member.following[0]).toStrictEqual(renderDiscussionIdentifier(discussionId))
      })
    })

    describe('when comment-created', () => {
      beforeEach(() => {
        h(mkEvent('comment-created', {
          id: arbitraryWord(),
          actorId: arbitraryWord(),
          discussionId: arbitraryWord(),
          content: arbitraryString(),
          publishedAt: new Date().toISOString(),
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
    const discussionId = arbitraryWord()
    const actorId = arbitraryWord()

    beforeEach(() => {
      h(mkEvent('discussion-started', {
        actorId,
        discussionId,
        doi: workId,
        collectionId,
      }))
    })

    it('there are two public activities in the timeline', () => {
      expect(d.getLocalTimeline()).toHaveLength(2)
    })

    describe('when front-matter-found in the discussion', () => {
      const title = arbitraryString()

      beforeEach(() => {
        h(mkEvent('work-updated', {
          id: arbitraryWord(),
          actorId,
          workId,
          attributes: {
            crossrefStatus: 'found',
            title,
            abstract: arbitraryString(),
            authors: [arbitraryString()],
          },
        }))
      })

      it('updates the discussion title', () => {
        const discussion = pipe(
          d.lookupEntry(discussionId),
          E.getOrElseW(shouldNotHappen),
        )
        expect(discussion.title).toBe(title)
      })
    })

    describe('when comment-created in the discussion', () => {
      beforeEach(() => {
        h(mkEvent('comment-created', {
          id: arbitraryWord(),
          actorId,
          discussionId,
          content: arbitraryString(),
          publishedAt: new Date().toISOString(),
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
          discussionId: arbitraryWord(),
          doi: arbitraryWord(),
          collectionId,
        }))
      })

      it('the actor is following both discussions', () => {
        const member = pipe(
          actorId,
          d.lookupMember,
          E.getOrElseW(shouldNotHappen),
        )
        expect(member.following).toHaveLength(2)
      })
    })
  })
})

