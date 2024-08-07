import * as O from 'fp-ts/Option'
import { includeCollection } from './include-collection'
import { includeCommunity } from './include-community'
import { includeMember } from './include-member'
import { includeWork } from './include-work'
import { renderCommentCreated } from './render-comment-created'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, Update } from '../../domain/index.open'
import { renderCollectionIdentifier } from '../json-api/render-collection-identifier'
import { renderCommunityIdentifier } from '../json-api/render-community-identifier'
import { renderEntryIdentifier } from '../json-api/render-entry-identifier'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'
import { renderWorkIdentifier } from '../json-api/render-work-identifier'
import { renderWorkNotFoundUpdateResource } from '../json-api/render-work-not-found-update-resource'

export const renderWithIncludes = (queries: Domain) => (update: Update): O.Option<UpdateWithIncludes> => {
  switch (update.type) {
    case 'update:community-created':
      return O.some({
        data: {
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
        included: [
          includeMember(queries, update.actorId),
          includeCommunity(queries),
        ],
      })
    case 'update:collection-created':
      return O.some({
        data: {
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
        included: [
          includeMember(queries, update.actorId),
          includeCollection(queries, update.collectionId),
        ],
      })
    case 'update:doi-entered':
      return O.some({
        data: {
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
        included: [
          includeMember(queries, update.actorId),
          includeCollection(queries, update.collectionId),
          includeWork(queries, update.workId),
        ],
      })
    case 'update:comment-created':
      return O.some(renderCommentCreated(queries, update))
    case 'update:front-matter-found':
      return O.some({
        data: {
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
        included: [
          includeMember(queries, update.actorId),
        ],
      })
    case 'update:work-not-found':
      return O.some({
        data: renderWorkNotFoundUpdateResource(update),
        included: [
          includeMember(queries, update.actorId),
          includeWork(queries, update.workId),
        ],
      })
    default:
      return O.none
  }
}

