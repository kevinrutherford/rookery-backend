import * as O from 'fp-ts/Option'
import { Activity } from '../activity-resource'
import { CollectionCreated } from '../domain'

export const toCollectionCreatedParagraph = (event: CollectionCreated): O.Option<Activity> => O.some({
  userHandle: 'you',
  action: `created collection ${event.data.name}`,
  content: '',
  timestamp: event.created,
})

