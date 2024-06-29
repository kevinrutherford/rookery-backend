import { pipe } from 'fp-ts/function'
import { Domain } from '../../src/domain/index.open'
import * as RestrictedDomain from '../../src/restricted-domain'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

type State = {
  handleEvent: UnrestrictedDomain.EventHandler,
  collectionId?: string,
  entryId?: string,
}

type StateModifier = (state: State) => State

const createCollection: StateModifier = (state) => {
  const collectionId = arbitraryWord()
  state.handleEvent(mkEvent('collection-created', {
    id: collectionId,
    name: arbitraryString(),
    description: arbitraryString(),
  }))
  return { ...state, collectionId }
}

const addEntry: StateModifier = (state) => {
  const entryId = arbitraryWord()
  state.handleEvent(mkEvent('doi-entered', {
    id: entryId,
    workId: arbitraryWord(),
    collectionId: state.collectionId,
  }))
  return { ...state, entryId }
}

const becomePrivate: StateModifier = (state) => {
  state.handleEvent(mkEvent('collection-updated', {
    collectionId: state.collectionId,
    attributes: {
      isPrivate: true,
    },
  }))
  return state
}

const addComment: StateModifier = (state) => {
  state.handleEvent(mkEvent('comment-created', {
    id: arbitraryWord(),
    entryId: state.entryId,
    content: arbitraryString(),
  }))
  return state
}

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
      beforeEach(() => {
        pipe(
          { handleEvent },
          createCollection,
        )
      })

      it('the activity is visible', () => {
        expect(restrictedQueries.getLocalTimeline()).toHaveLength(1)
        // SMELL: check details of the activity
      })
    })

    describe('when collection-created (private)', () => {
      it.todo('the activity is not visible')
    })

    describe('when doi-entered (in a public collection)', () => {
      it('the activity is visible', () => {
        const initialState = pipe(
          { handleEvent },
          createCollection,
        )
        const initialActivityCount = restrictedQueries.getLocalTimeline().length
        addEntry(initialState)
        expect(restrictedQueries.getLocalTimeline().length - initialActivityCount).toBe(1)
      })
    })

    describe('when doi-entered (in a private collection)', () => {
      beforeEach(() => {
        pipe(
          { handleEvent },
          createCollection,
          becomePrivate,
          addEntry,
        )
      })

      it('the activity is not visible', () => {
        expect(restrictedQueries.getLocalTimeline()).toHaveLength(1)
        // SMELL: check details of the activity
      })
    })

    describe('when comment-created (in a public collection)', () => {
      beforeEach(() => {
        pipe(
          { handleEvent },
          createCollection,
          addEntry,
          addComment,
        )
      })

      it('the activity is visible', () => {
        expect(restrictedQueries.getLocalTimeline()).toHaveLength(3)
        // SMELL: check details of the activity
      })
    })

    describe('when comment-created (in a private collection)', () => {
      beforeEach(() => {
        pipe(
          { handleEvent },
          createCollection,
          addEntry,
          becomePrivate,
          addComment,
        )
      })

      it('the activity is not visible', () => {
        expect(restrictedQueries.getLocalTimeline()).toHaveLength(2)
        // SMELL: check details of the activity
      })
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

