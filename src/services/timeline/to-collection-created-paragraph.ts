import * as O from 'fp-ts/Option'
import { CollectionCreated } from '../../domain/index.open'
import { Activity } from '../activity-resource'

export const toCollectionCreatedParagraph = (event: CollectionCreated): O.Option<Activity> => O.some({
  userHandle: 'you',
  action: `created collection ${event.data.name}`,
  content: '',
  timestamp: event.created,
})

