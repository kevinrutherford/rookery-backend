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
      id: '10.7554%2Felife.80483',
      doi: '10.7554/elife.80483',
      frontMatter: {
        crossrefStatus: 'found',
        title: 'Some paper about poisons',
        abstract: '', // SMELL -- should not be needed for the feed
        authors: [], // SMELL -- should not be needed for the feed
      },
    },
    discussion: {
      id: '567',
    },
  },
]

