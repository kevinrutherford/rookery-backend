import * as O from 'fp-ts/Option'
import { Activity, CollectionCreated } from '../../domain/index.open'

/**
 * @deprecated This should be done inside the domain
 */
export const toCollectionCreatedParagraph = (event: CollectionCreated): O.Option<Activity> => O.some({
  id: event.id,
  userHandle: 'you',
  action: `created collection ${event.data.name}`,
  content: '',
  timestamp: event.created,
})

