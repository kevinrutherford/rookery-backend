import { Update } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

type GFT = (currentState: Readmodel) => () => ReadonlyArray<Update>

export const getFollowedTimeline: GFT = () => () => [
  {
    kind: 'inbox-update:comment-created',
    id: '123',
    created: new Date(),
    actorId: '@voldemort@rookery-1.xpsurgery.com',
    occurredWithinPrivateCollection: false,
    actor: {
      id: '@voldemort@rookery-1.xpsurgery.com',
      username: '@voldemort@rookery-1.xpsurgery.com',
      displayName: 'Voldemort',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Lordvoldemort.jpg',
      following: [],
      cache: 'fetched', // SMELL -- incorrect coupling
    },
    work: {
      title: 'Some paper about poisons',
    },
    discussion: {
      id: '567',
    },
  },
]

