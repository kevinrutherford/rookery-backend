import * as O from 'fp-ts/Option'
import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  if (event.type === 'community-created')
    state.data = O.some(event.data)
}

