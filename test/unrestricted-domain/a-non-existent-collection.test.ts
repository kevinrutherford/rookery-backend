import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../src/domain/domain'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryWord, shouldNotHappen } from '../helpers'
import { mkEvent } from '../mk-event'

describe('given a non-existent collection', () => {
  const collectionId = arbitraryWord()
  const actorId = arbitraryWord()
  let queries: Domain
  let handleEvent: UnrestrictedDomain.EventHandler

  beforeEach(() => {
    const domain = UnrestrictedDomain.instantiate(defaultTestObserver)
    queries = domain.queries
    handleEvent = domain.handleEvent
  })

  describe('discussion-started', () => {
    const entryId = arbitraryWord()

    beforeEach(() => {
      handleEvent(mkEvent('member-joined', {
        id: actorId,
        username: arbitraryWord(),
        displayName: arbitraryWord(),
        avatarUrl: arbitraryWord(),
      }))
      handleEvent(mkEvent('discussion-started', {
        actorId,
        entryId,
        doi: arbitraryWord(),
        collectionId,
      }))
    })

    it('does not record the Work', () => {
      expect(queries.allWorks()).toHaveLength(0)
    })

    it('does not record the Entry', () => {
      expect(queries.lookupEntry(entryId)).toStrictEqual(E.left('not-found'))
    })

    it('does not record the Activity', () => {
      expect(queries.getLocalTimeline()).toHaveLength(0)
    })

    it('reports the event as unexpected', () => {
      expect(queries.info().unexpectedEvents).toHaveLength(1)
    })

    it('does not set the actor to follow the entry', () => {
      const member = pipe(
        actorId,
        queries.lookupMember,
        E.getOrElseW(shouldNotHappen),
      )
      expect(member.following).toHaveLength(0)
    })
  })

})

