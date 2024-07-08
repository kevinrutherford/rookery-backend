import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Authority } from '../auth/authority'
import { Domain, Update } from '../domain/index.open'

export const clientCanSeeUpdate = (claims: Authority, queries: Domain) => (update: Update): boolean => {
  if (claims('browse-private-collections'))
    return true
  switch (update.type) {
    case 'comment-created':
    case 'doi-entered':
      return !(update.occurredWithinPrivateCollection)
    case 'update:front-matter-found':
    case 'update:work-not-found':
      return pipe(
        update.workId,
        queries.collectionsContainingWork,
        RA.filter((collection) => !collection.isPrivate),
        RA.isNonEmpty,
      )
    default:
      return true
  }
}

