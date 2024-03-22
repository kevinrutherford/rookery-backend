import * as E from 'fp-ts/Either'
import { TimelineParagraph } from './timeline-paragraph'
import { ErrorOutcome } from '../../http/index.open'
import { DomainEvent } from '../../readmodels/domain-event'

export type ParagraphRenderer = (event: DomainEvent) => E.Either<ErrorOutcome, TimelineParagraph>

