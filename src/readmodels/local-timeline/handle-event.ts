/* eslint-disable @typescript-eslint/no-unused-vars */
import { RecordedEvent } from '@eventstore/db-client'
import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: RecordedEvent<DomainEvent>): void => {
}

