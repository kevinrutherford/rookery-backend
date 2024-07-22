import * as E from 'fp-ts/Either'
import { renderAccount } from '../json-api/render-account'
import { renderAccountIdentifier } from '../json-api/render-account-identifier'
import { renderEntry } from '../json-api/render-entry'
import { renderEntryIdentifier } from '../json-api/render-entry-identifier'
import { renderWork } from '../json-api/render-work'
import { renderWorkIdentifier } from '../json-api/render-work-identifier'
import { Service } from '../service'

const account = {
  id: '@voldemort@rookery-1.xpsurgery.com',
  username: '@voldemort@rookery-1.xpsurgery.com',
  displayName: 'Voldemort',
  avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Lordvoldemort.jpg',
}

const work = {
  id: '5678',
  doi: '10.1234/45678',
  updatedAt: new Date(),
  frontMatter: {
    crossrefStatus: 'not-determined' as const,
    reason: 'never-fetched' as const,
  },
}

const entry = {
  id: '1234',
  workId: work.id,
  collectionId: 'snape_stuff',
  commentsCount: 13,
  addedAt: new Date(),
}

export const getFederatedTimeline = (): Service => () => E.right({
  data: [
    {
      type: 'update:comment-created',
      id: '123',
      attributes: {
        occurred_at: new Date().toISOString(),
      },
      relationships: {
        actor: { data: renderAccountIdentifier(account.id) },
        entry: { data: renderEntryIdentifier(entry.id) },
        work: { data: renderWorkIdentifier(work.id) },
      },
    },
  ],
  included: [
    renderAccount(account),
    renderEntry(entry),
    renderWork(work),
  ],
})

