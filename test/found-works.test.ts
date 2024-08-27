import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { defaultTestObserver } from './default-test-observer'
import { arbitraryString, arbitraryWord } from './helpers'
import { mkEvent } from './mk-event'
import { getWorks } from '../src/services/work/works'
import * as UnrestrictedDomain from '../src/unrestricted-domain'

const mustBeOnTheRight = (
  E.getOrElseW((errors) => { throw new Error(`should not happen: ${JSON.stringify(errors)}`) })
)

describe('given a Work that has been found on Crossref', () => {
  const actorId = arbitraryWord()
  const doi = arbitraryWord()
  const title = arbitraryString()
  let domain: ReturnType<typeof UnrestrictedDomain.instantiate>

  beforeEach(() => {
    domain = UnrestrictedDomain.instantiate(defaultTestObserver)
    const collectionId = arbitraryWord()
    domain.handleEvent(mkEvent('member-joined', {
      id: actorId,
      username: arbitraryWord(),
      displayName: arbitraryWord(),
      avatarUrl: arbitraryWord(),
    }))
    domain.handleEvent(mkEvent('collection-created', {
      id: collectionId,
      actorId,
      name: arbitraryString(),
      description: arbitraryString(),
    }))
    domain.handleEvent(mkEvent('discussion-started', {
      actorId,
      discussionId: arbitraryWord(),
      doi,
      collectionId,
    }))
    domain.handleEvent(mkEvent('work-updated', {
      actorId,
      workId: doi,
      attributes: {
        crossrefStatus: 'found',
        title,
        abstract: arbitraryString(),
        authors: [
          'Elinor Ostrom',
        ],
      },
    }))
  })

  it('can be filtered out', () => {
    const response = pipe(
      {
        'filter[crossrefStatus]': 'not-determined',
      },
      getWorks(domain.queries),
      mustBeOnTheRight,
    )
    expect('data' in response && response.data).toHaveLength(0)
  })

  it('can be filtered in', () => {
    const response = pipe(
      {
        'filter[crossrefStatus]': 'found',
      },
      getWorks(domain.queries),
      mustBeOnTheRight,
    )
    expect('data' in response && response.data).toHaveLength(1)
  })

  describe('when the work is added to another collection', () => {
    beforeEach(() => {
      domain.handleEvent(mkEvent('discussion-started', {
        actorId,
        discussionId: arbitraryWord(),
        doi,
        collectionId: arbitraryWord(),
      }))
    })

    it.failing('gives the work title to the discussion', () => {
      const discussionTitles = pipe(
        doi,
        domain.queries.findDiscussionsAboutWork,
        RA.map((discussion) => discussion.title),
      )
      expect(discussionTitles).toHaveLength(2)
      expect(discussionTitles[0]).toStrictEqual(title)
      expect(discussionTitles[1]).toStrictEqual(title)
    })
  })
})

