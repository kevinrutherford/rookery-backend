import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'
import { TimelineParagraph } from './timeline-paragraph'
import { ErrorOutcome } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { DomainEvent } from '../../readmodels/domain-event'

const DoiEntered = t.type({
  collectionId: t.string,
  doi: t.string,
})

type ParagraphRenderer = (event: DomainEvent) => E.Either<ErrorOutcome, TimelineParagraph>

export const renderDoiEntered = (queries: Queries): ParagraphRenderer => (event) => pipe(
  event.data,
  DoiEntered.decode,
  E.mapLeft((errors) => ({
    category: 'bad-input' as const,
    message: 'could not parse collection-created event payload',
    evidence: { event, errors: formatValidationErrors(errors) },
  }) as ErrorOutcome),
  E.chain((payload) => pipe(
    payload.collectionId,
    queries.lookupCollection,
    E.fromOption(() => ({
      category: 'not-found',
      message: 'Should not happen: collection not found',
      evidence: { event },
    }) as ErrorOutcome),
    E.map((collection) => ({
      userHandle: 'you',
      action: `added a paper to collection ${collection.name}`,
      content: payload.doi,
      timestamp: event.created,
    })),
  )),
)

