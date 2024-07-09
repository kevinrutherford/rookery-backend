import * as O from 'fp-ts/Option'
import { Activity, WorkNotFound } from '../../domain/index.open'

export const toWorkNotFoundParagraph = (update: WorkNotFound): O.Option<Activity> => O.some({
  type: 'update:work-not-found',
  id: update.id,
  actor: update.actor,
  occurred_at: update.created,
  workId: update.workId,
})

