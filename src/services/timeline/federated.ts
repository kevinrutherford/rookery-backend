import * as E from 'fp-ts/Either'
import { renderAccountIdentifier } from '../json-api/render-account-identifier'
import { Service } from '../service'

export const getFederatedTimeline = (): Service => () => E.right({
  data: [
    {
      type: 'update:comment-created',
      id: '123',
      attributes: {
        content: 'We definitely need to reference this paper',
        occurred_at: new Date().toISOString(),
      },
      relationships: {
        actor: { data: renderAccountIdentifier('@voldemort@rookery-1.xpsurgery.com') },
      },
    },
  ],
  included: [
    {
      ...renderAccountIdentifier('@voldemort@rookery-1.xpsurgery.com'),
      attributes: {
        username: '@voldemort@rookery-1.xpsurgery.com',
        display_name: 'Voldemort',
        avatar_url: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Lordvoldemort.jpg',
      },
    },
  ],
})

