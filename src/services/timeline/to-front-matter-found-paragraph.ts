import * as O from 'fp-ts/Option'
import { Activity, FrontMatterFound } from '../../domain/index.open'

// eslint-disable-next-line consistent-return
export const toFrontMatterFoundParagraph = (update: FrontMatterFound): O.Option<Activity> => O.some({
  type: 'activity',
  id: update.id,
  actor: update.actor,
  action: 'found the title of a paper',
  content: update.title, // SMELL -- the Work should be linked via a relationship
  occurred_at: update.created,
})

