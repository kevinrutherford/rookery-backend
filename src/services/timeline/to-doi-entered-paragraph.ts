import { sequenceS } from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { UpdateWithIncludes } from './update-with-includes'
import { DoiEntered, Domain, Work } from '../../domain/index.open'
import { renderUpdateResource } from '../json-api/render-update-resource'

// eslint-disable-next-line consistent-return
const titleOf = (work: Work) => {
  switch (work.frontMatter.crossrefStatus) { // SMELL: this should be done in the domain
    case 'not-determined':
    case 'not-found':
      return work.id
    case 'found':
      return work.frontMatter.title
  }
}

export const toDoiEnteredParagraph = (queries: Domain) => (activity: DoiEntered): UpdateWithIncludes => ({
  data: pipe(
    {
      collection: queries.lookupCollection(activity.collectionId),
      work: queries.lookupWork(activity.workId),
    },
    sequenceS(E.Apply),
    O.fromEither,
    O.map(({ collection, work }) => ({
      type: 'activity' as const,
      id: activity.id,
      accountId: activity.actorId,
      action: `added an item to collection ${collection.name}`,
      content: titleOf(work),
      occurred_at: activity.created,
    })),
    O.map(renderUpdateResource),
  ),
  included: pipe(
    [
      includeAccount(queries, activity.actorId),
    ],
    RA.compact,
  ),
})

