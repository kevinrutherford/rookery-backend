import { sequenceS } from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { includeCommunity } from './include-community'
import { includeEntry } from './include-entry'
import { includeWork } from './include-work'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, Update, Work } from '../../domain/index.open'
import { renderCommentCreatedUpdateResource } from '../json-api/render-comment-created-update-resource'
import { renderUpdateResource } from '../json-api/render-update-resource'
import { renderWorkNotFoundUpdateResource } from '../json-api/render-work-not-found-update-resource'

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

export const renderWithIncludes = (queries: Domain) => (update: Update): UpdateWithIncludes => {
  switch (update.type) { // SMELL -- duplicated switch? consider driving all copies from data
    case 'update:community-created':
      return ({
        data: pipe(
          {
            type: 'update:community-created',
            id: update.id,
            accountId: update.actorId,
            communityId: update.communityId,
            occurred_at: update.created,
          },
          renderUpdateResource,
          O.some,
        ),
        included: pipe(
          [
            includeAccount(queries, update.actorId),
            includeCommunity(queries),
          ],
          RA.compact,
        ),
      })
    case 'collection-created':
      return ({
        data: pipe(
          {
            type: 'activity',
            id: update.id,
            accountId: update.actorId,
            action: `created collection ${update.name}`,
            content: '',
            occurred_at: update.created,
          },
          renderUpdateResource,
          O.some,
        ),
        included: pipe(
          [
            includeAccount(queries, update.actorId),
          ],
          RA.compact,
        ),
      })
    case 'doi-entered':
      return ({
        data: pipe(
          {
            collection: queries.lookupCollection(update.collectionId),
            work: queries.lookupWork(update.workId),
          },
          sequenceS(E.Apply),
          O.fromEither,
          O.map(({ collection, work }) => ({
            type: 'activity' as const,
            id: update.id,
            accountId: update.actorId,
            action: `added an item to collection ${collection.name}`,
            content: titleOf(work), // SMELL: relate to the Work instead
            occurred_at: update.created,
          })),
          O.map(renderUpdateResource),
        ),
        included: pipe(
          [
            includeAccount(queries, update.actorId),
          ],
          RA.compact,
        ),
      })
    case 'update:comment-created':
      return ({
        data: O.some(renderCommentCreatedUpdateResource(update)),
        included: pipe(
          [
            includeAccount(queries, update.actorId),
            includeEntry(queries, update.entryId),
            includeWork(queries, update.workId),
          ],
          RA.compact,
        ),
      })
    case 'update:front-matter-found':
      return ({
        data: pipe(
          {
            type: 'activity',
            id: update.id,
            accountId: update.actorId,
            action: 'found the title of a paper',
            content: update.title, // SMELL -- the Work should be linked via a relationship
            occurred_at: update.created,
          },
          renderUpdateResource,
          O.some,
        ),
        included: pipe(
          [
            includeAccount(queries, update.actorId),
          ],
          RA.compact,
        ),
      })
    case 'update:work-not-found':
      return ({
        data: pipe(
          update,
          renderWorkNotFoundUpdateResource,
          O.some,
        ),
        included: pipe(
          [
            includeWork(queries, update.workId),
            includeAccount(queries, update.actorId),
          ],
          RA.compact,
        ),
      })
    default:
      return {
        data: O.none,
        included: [],
      }
  }
}

