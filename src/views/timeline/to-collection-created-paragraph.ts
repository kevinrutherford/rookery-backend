import * as O from 'fp-ts/Option'
import { TimelineParagraph } from './timeline-paragraph'
import { CollectionCreated } from '../queries'

export const toCollectionCreatedParagraph = (event: CollectionCreated): O.Option<TimelineParagraph> => O.some({
  userHandle: 'you',
  action: `created collection ${event.data.name}`,
  content: '',
  timestamp: event.created,
})

