import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'
import { ParagraphRenderer } from './paragraph-renderer'

const CollectionCreated = t.type({
  name: t.string,
})

export const renderCollectionCreated: ParagraphRenderer = (event) => pipe(
  event.data,
  CollectionCreated.decode,
  E.bimap(
    (errors) => ({
      category: 'bad-input',
      message: 'could not parse collection-created event payload',
      evidence: { event, errors: formatValidationErrors(errors) },
    }),
    (payload) => ({
      userHandle: 'you',
      action: `created collection ${payload.name}`,
      content: '',
      timestamp: event.created,
    }),
  ),
)

