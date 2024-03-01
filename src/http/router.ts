import { Request, Response, Router } from 'express'
import { executeView } from './execute-view'
import { Logger } from './logger'
import { ping } from './ping'
import { Views } from '../views'

type RouteHandler = (req: Request, res: Response) => void

type RouteHandlers = {
  about: RouteHandler,
  collections: RouteHandler,
  collection: RouteHandler,
  entry: RouteHandler,
  ping: RouteHandler,
}

export const router = (views: Views, logger: Logger): Router => {
  const r = Router()

  const routeHandlers: RouteHandlers = {
    about: executeView(logger)(views.getAbout),
    collections: executeView(logger)(views.getCollections),
    collection: executeView(logger)(views.getCollection),
    entry: executeView(logger)(views.getEntry),
    ping,
  }

  r.get('/ping', routeHandlers.ping)

  r.get('/about', routeHandlers.about)
  r.get('/collections', routeHandlers.collections)
  r.get('/collections/:id', routeHandlers.collection)
  r.get('/entries/:id', routeHandlers.entry)

  return r
}

