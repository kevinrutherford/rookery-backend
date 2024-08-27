import { flow, identity } from 'fp-ts/function'
import { Authority } from '../../src/auth/authority'
import { Domain } from '../../src/domain/index.open'
import * as RestrictedDomain from '../../src/restricted-domain'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { defaultTestObserver } from '../default-test-observer'
import { arbitraryString, arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

const actorId = arbitraryWord()

type State = {
  handleEvent: UnrestrictedDomain.EventHandler,
  collectionId?: string,
  discussionId?: string,
  workId?: string,
}

type StateModifier = (state: State) => State

type Action = {
  description: string,
  act: StateModifier,
}

const createCommunity: Action = {
  description: 'community-created',
  act: (state) => {
    const id = arbitraryWord()
    state.handleEvent(mkEvent('community-created', {
      id,
      actorId,
      name: arbitraryString(),
      affiliation: arbitraryString(),
      overview: [arbitraryString()],
      theme: 'slate',
    }))
    return { ...state }
  },
}

const createCollection: Action = {
  description: 'collection-created',
  act: (state) => {
    const collectionId = arbitraryWord()
    state.handleEvent(mkEvent('collection-created', {
      id: collectionId,
      actorId,
      name: arbitraryString(),
      description: arbitraryString(),
    }))
    return { ...state, collectionId }
  },
}

const addDiscussion: Action = {
  description: 'discussion-started',
  act: (state) => {
    const discussionId = arbitraryWord()
    const workId = arbitraryWord()
    state.handleEvent(mkEvent('discussion-started', {
      actorId,
      discussionId,
      doi: workId,
      collectionId: state.collectionId,
    }))
    return { ...state, discussionId, workId }
  },
}

const becomePrivate: Action = {
  description: 'collection-updated to become private',
  act: (state) => {
    state.handleEvent(mkEvent('collection-updated', {
      actorId,
      collectionId: state.collectionId,
      attributes: {
        isPrivate: true,
      },
    }))
    return state
  },
}

const addComment: Action = {
  description: 'comment-added',
  act: (state) => {
    state.handleEvent(mkEvent('comment-created', {
      id: arbitraryWord(),
      actorId,
      discussionId: state.discussionId ?? 'not-found',
      content: arbitraryString(),
      publishedAt: new Date().toISOString(),
    }))
    return state
  },
}

const workFound: Action = {
  description: 'work found',
  act: (state) => {
    state.handleEvent(mkEvent('work-updated', {
      actorId,
      workId: state.workId,
      attributes: {
        crossrefStatus: 'found',
        title: arbitraryString(),
        abstract: arbitraryString(),
        authors: [arbitraryString(), arbitraryString()],
      },
    }))
    return state
  },
}

type Scenario = {
  description: string,
  setup: StateModifier,
}

const emptyDatabase: Scenario = {
  description: 'an empty community',
  setup: identity,
}

const emptyCollection: Scenario = {
  description: 'an empty public collection',
  setup: createCollection.act,
}

const emptyPrivateCollection: Scenario = {
  description: 'an empty private collection',
  setup: flow(emptyCollection.setup, becomePrivate.act),
}

const publicCollectionWithDiscussion: Scenario = {
  description: 'an discussion in a public collection',
  setup: flow(emptyCollection.setup, addDiscussion.act),
}

const privateCollectionWithDiscussion: Scenario = {
  description: 'an discussion in a private collection',
  setup: flow(publicCollectionWithDiscussion.setup, becomePrivate.act),
}

type Example = [scenario: Scenario, event: Action, activitiesAdded: number]
type Examples = ReadonlyArray<Example>

type Client = {
  description: string,
  claims: Authority,
}

const noPrivileges: Client = {
  description: 'has no privileges',
  claims: () => false,
}

const canBrowsePrivateCollections: Client = {
  description: 'can browse private collections',
  claims: (requiredScope) => requiredScope === 'browse-private-collections',
}

describe.each([
  [noPrivileges, [
    [emptyDatabase, createCommunity, 1],
    [emptyDatabase, createCollection, 1],
    // [emptyDatabase, createPrivateCollection, 0],
    [emptyCollection, addDiscussion, 1],
    [emptyPrivateCollection, addDiscussion, 0],
    [publicCollectionWithDiscussion, addComment, 1],
    [privateCollectionWithDiscussion, addComment, 0],
    [publicCollectionWithDiscussion, workFound, 1],
    [privateCollectionWithDiscussion, workFound, 0],
  ] satisfies Examples],
  [canBrowsePrivateCollections, [
    [emptyDatabase, createCommunity, 1],
    [emptyDatabase, createCollection, 1],
    // [emptyDatabase, createPrivateCollection, 1],
    [emptyCollection, addDiscussion, 1],
    [emptyPrivateCollection, addDiscussion, 1],
    [publicCollectionWithDiscussion, addComment, 1],
    [privateCollectionWithDiscussion, addComment, 1],
    [publicCollectionWithDiscussion, workFound, 1],
    [privateCollectionWithDiscussion, workFound, 1],
  ] satisfies Examples],
])('client-can-see-update', (client: Client, examples: Examples) => {
  let handleEvent: UnrestrictedDomain.EventHandler
  let unrestrictedQueries: Domain

  describe.each(examples)(`given a client who ${client.description}`, (scenario: Scenario, action: Action, activitiesAdded: number) => {
    describe(`and ${scenario.description}`, () => {

      beforeEach(() => {
        const unrestrictedDomain = UnrestrictedDomain.instantiate(defaultTestObserver)
        handleEvent = unrestrictedDomain.handleEvent
        unrestrictedQueries = unrestrictedDomain.queries
        handleEvent(mkEvent('member-joined', {
          id: actorId,
          username: arbitraryWord(),
          displayName: arbitraryWord(),
          avatarUrl: arbitraryWord(),
        }))
      })

      it(`when ${action.description}, the activity is ${activitiesAdded === 0 ? 'not ' : ''}visible`, () => {
        const restrictedQueries = RestrictedDomain.instantiate(client.claims, unrestrictedQueries)
        const initialState = scenario.setup({ handleEvent })
        const initialActivityCount = restrictedQueries.getLocalTimeline().length
        action.act(initialState)
        expect(restrictedQueries.getLocalTimeline().length - initialActivityCount).toBe(activitiesAdded)
      })
    })
  })
})

