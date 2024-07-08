import * as O from 'fp-ts/Option'
import { Activity, WorkNotFound } from '../../domain/index.open'

export const toWorkNotFoundParagraph = (update: WorkNotFound): O.Option<Activity> => O.some({
  type: 'activity',
  id: update.id,
  actor: update.actor,
  action: 'could not find a DOI',
  content: update.workId,
  occurred_at: update.created,
})

