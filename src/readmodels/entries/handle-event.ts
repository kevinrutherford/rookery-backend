import { RecordedEvent } from '@eventstore/db-client'
import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleEvent = (state: Readmodel) => (event: RecordedEvent<DomainEvent>): void => {
}

