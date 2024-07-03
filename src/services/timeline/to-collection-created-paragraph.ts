import * as O from 'fp-ts/Option'
import { Activity, CollectionCreated } from '../../domain/index.open'

/**
 * @deprecated This should be done inside the domain
 */
export const toCollectionCreatedParagraph = (activity: CollectionCreated): O.Option<Activity> => O.some({
  type: 'activity',
  id: activity.id,
  actor: activity.actor,
  action: `created collection ${activity.name}`,
  content: '',
  occurred_at: activity.created,
})

