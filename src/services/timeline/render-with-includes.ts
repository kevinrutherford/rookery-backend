import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { includeCollection } from './include-collection'
import { includeCommunity } from './include-community'
import { includeEntry } from './include-entry'
import { includeMember } from './include-member'
import { includeWork } from './include-work'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, Update } from '../../domain/index.open'
import { renderCollectionIdentifier } from '../json-api/render-collection-identifier'
import { renderCommunityIdentifier } from '../json-api/render-community-identifier'
import { renderEntryIdentifier } from '../json-api/render-entry-identifier'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'
import { renderWorkIdentifier } from '../json-api/render-work-identifier'
import { renderWorkNotFoundUpdateResource } from '../json-api/render-work-not-found-update-resource'

export const renderWithIncludes = (queries: Domain) => (update: Update): UpdateWithIncludes => {
  switch (update.type) {
    case 'update:community-created':
      return ({
        data: pipe(
          {
            type: 'update:community-created',
            id: update.id,
            attributes: {
              occurred_at: update.created.toISOString(),
            },
            relationships: {
              actor: { data: renderMemberIdentifier(update.actorId) },
              community: { data: renderCommunityIdentifier(update.communityId) },
            },
          },
          O.some,
        ),
        included: [
          includeMember(queries, update.actorId),
          includeCommunity(queries),
        ],
      })
    case 'update:collection-created':
      return ({
        data: pipe(
          {
            type: 'update:collection-created',
            id: update.id,
            attributes: {
              occurred_at: update.created.toISOString(),
            },
            relationships: {
              actor: { data: renderMemberIdentifier(update.actorId) },
              collection: { data: renderCollectionIdentifier(update.collectionId) },
            },
          },
          O.some,
        ),
        included: [
          includeMember(queries, update.actorId),
          includeCollection(queries, update.collectionId),
        ],
      })
    case 'update:doi-entered':
      return ({
        data: pipe(
          {
            type: 'update:doi-entered',
            id: update.id,
            attributes: {
              occurred_at: update.created.toISOString(),
            },
            relationships: {
              actor: { data: renderMemberIdentifier(update.actorId) },
              collection: { data: renderCollectionIdentifier(update.collectionId) },
              entry: { data: renderEntryIdentifier(update.entryId) },
              work: { data: renderWorkIdentifier(update.workId) },
            },
          },
          O.some,
        ),
        included: [
          includeMember(queries, update.actorId),
          includeCollection(queries, update.collectionId),
          includeWork(queries, update.workId),
        ],
      })
    case 'update:comment-created':
      return ({
        data: O.some({
          type: update.type,
          id: update.id,
          attributes: {
            occurred_at: update.created.toISOString(),
          },
          relationships: {
            actor: { data: renderMemberIdentifier(update.actorId) },
            entry: { data: renderEntryIdentifier(update.entryId) },
            work: { data: renderWorkIdentifier(update.workId) },
          },
        }),
        included: [
          includeMember(queries, update.actorId),
          includeEntry(queries, update.entryId),
          includeWork(queries, update.workId),
        ],
      })
    case 'update:front-matter-found':
      return ({
        data: pipe(
          {
            type: 'update:front-matter-fetched',
            id: update.id,
            attributes: {
              occurred_at: update.created.toISOString(),
            },
            relationships: {
              actor: { data: renderMemberIdentifier(update.actorId) },
              work: { data: renderWorkIdentifier(update.workId) },
            },
          },
          O.some,
        ),
        included: [
          includeMember(queries, update.actorId),
        ],
      })
    case 'update:work-not-found':
      return ({
        data: O.some(renderWorkNotFoundUpdateResource(update)),
        included: [
          includeMember(queries, update.actorId),
          includeWork(queries, update.workId),
        ],
      })
    default:
      return {
        data: O.none,
        included: [],
      }
  }
}

