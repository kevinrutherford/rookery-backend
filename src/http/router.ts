import { Router } from 'express'
import { executeView } from './execute-view'
import { Logger } from './logger'
import ping from './ping'
import { Views } from '../views'

export const router = (views: Views, logger: Logger): Router => {
  const r = Router()

  const routeHandlers = {
    about: executeView(logger)(views.getAbout),
    collections: executeView(logger)(views.getCollections),
    collection: executeView(logger)(views.getCollection),
    entry: executeView(logger)(views.getEntry),
    ping: ping(),
  }

  r.get('/ping', routeHandlers.ping)

  r.get('/about', routeHandlers.about)
  r.get('/collections', routeHandlers.collections)
  r.get('/collections/:id', routeHandlers.collection)
  r.get('/entries/:id', routeHandlers.entry)

  return r
}

