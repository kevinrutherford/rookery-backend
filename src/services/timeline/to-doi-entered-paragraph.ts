import { sequenceS } from 'fp-ts/Apply'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import {
  Activity, DoiEntered, Domain, Work,
} from '../../domain/index.open'

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

export const toDoiEnteredParagraph = (queries: Domain) => (activity: DoiEntered): O.Option<Activity> => pipe(
  {
    collection: pipe(
      queries.lookupCollection(activity.collectionId),
      O.fromEither,
    ),
    work: queries.lookupWork(activity.workId),
  },
  sequenceS(O.Apply),
  O.map(({ collection, work }) => ({
    type: 'activity',
    id: activity.id,
    actor: 'you',
    action: `added an item to collection ${collection.name}`,
    content: titleOf(work),
    occurred_at: activity.created,
  })),
)

