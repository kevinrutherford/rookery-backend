import { cacheActor } from './cache-actor'
import { Update } from '../../domain/update-resource'
import { Readmodel } from '../state/readmodel'

export const recordUpdate = (state: Readmodel, update: Update): void => {
  state.updates.push(update)
  cacheActor(state, update.actorId)
}

