import * as E from 'fp-ts/Either'
import { Authority } from '../../src/auth/authority'
import { Domain } from '../../src/domain/domain'
import * as RestrictedDomain from '../../src/restricted-domain'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

const canBrowsePrivateCollections: Authority = () => true
const cannotBrowsePrivateCollections: Authority = () => false

describe('visibility of works', () => {
  const workId = arbitraryWord()
  let handleEvent: UnrestrictedDomain.EventHandler
  let unrestrictedQueries: Domain
  let restrictedQueries: Domain

  beforeEach(() => {
    const unrestrictedDomain = UnrestrictedDomain.instantiate(defaultTestObserver)
    handleEvent = unrestrictedDomain.handleEvent
    unrestrictedQueries = unrestrictedDomain.queries
  })

  describe('given a public collection and a private collection', () => {
    const publicCollectionId = arbitraryWord()
    const privateCollectionId = arbitraryWord()

    beforeEach(() => {
      handleEvent(mkEvent('collection-created', {
        id: publicCollectionId,
        actorId: arbitraryWord(),
        name: arbitraryString(),
        description: arbitraryString(),
      }))
      handleEvent(mkEvent('collection-created', {
        id: privateCollectionId,
        actorId: arbitraryWord(),
        name: arbitraryString(),
        description: arbitraryString(),
      }))
      handleEvent(mkEvent('collection-updated', {
        actorId: arbitraryWord(),
        collectionId: privateCollectionId,
        attributes: {
          isPrivate: true,
        },
      }))
    })

    describe('and a Work entered only in the public collection', () => {
      beforeEach(() => {
        handleEvent(mkEvent('discussion-started', {
          actorId: arbitraryWord(),
          discussionId: arbitraryWord(),
          doi: workId,
          collectionId: publicCollectionId,
        }))
      })

      describe('the work is visible to an unauthenticated client', () => {
        beforeEach(() => {
          restrictedQueries = RestrictedDomain.instantiate(cannotBrowsePrivateCollections, unrestrictedQueries)
        })

        it('in the list of all works', () => {
          expect(restrictedQueries.allWorks()).toHaveLength(1)
        })

        it('when looked up', () => {
          expect(E.isRight(restrictedQueries.lookupWork(workId))).toBe(true)
        })
      })
    })

    describe('and a Work entered only in the private collection', () => {
      beforeEach(() => {
        handleEvent(mkEvent('discussion-started', {
          actorId: arbitraryWord(),
          discussionId: arbitraryWord(),
          doi: workId,
          collectionId: privateCollectionId,
        }))
      })

      describe('the work is visible to an authenticated client', () => {
        beforeEach(() => {
          restrictedQueries = RestrictedDomain.instantiate(canBrowsePrivateCollections, unrestrictedQueries)
        })

        it('in the list of all works', () => {
          expect(restrictedQueries.allWorks()).toHaveLength(1)
        })

        it('when looked up', () => {
          expect(E.isRight(restrictedQueries.lookupWork(workId))).toBe(true)
        })
      })

      describe('the work is not visible to an unauthenticated client', () => {
        beforeEach(() => {
          restrictedQueries = RestrictedDomain.instantiate(cannotBrowsePrivateCollections, unrestrictedQueries)
        })

        it('in the list of all works', () => {
          expect(restrictedQueries.allWorks()).toHaveLength(0)
        })

        it('when looked up', () => {
          expect(E.isLeft(restrictedQueries.lookupWork(workId))).toBe(true)
        })
      })
    })

    describe('and a Work entered in both collections', () => {
      beforeEach(() => {
        handleEvent(mkEvent('discussion-started', {
          actorId: arbitraryWord(),
          discussionId: arbitraryWord(),
          doi: workId,
          collectionId: publicCollectionId,
        }))
        handleEvent(mkEvent('discussion-started', {
          actorId: arbitraryWord(),
          discussionId: arbitraryWord(),
          doi: workId,
          collectionId: privateCollectionId,
        }))
      })

      describe('the work is visible to an unauthenticated client', () => {
        beforeEach(() => {
          restrictedQueries = RestrictedDomain.instantiate(cannotBrowsePrivateCollections, unrestrictedQueries)
        })

        it('in the list of all works', () => {
          expect(restrictedQueries.allWorks()).toHaveLength(1)
        })

        it('when looked up', () => {
          expect(E.isRight(restrictedQueries.lookupWork(workId))).toBe(true)
        })
      })
    })
  })
})

