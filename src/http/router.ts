import { Request, Response, Router } from 'express'

type RouteHandler = (req: Request, res: Response) => void

export type RouteHandlers = {
  about: RouteHandler,
  collections: RouteHandler,
  collection: RouteHandler,
  entry: RouteHandler,
  ping: RouteHandler,
}

export const router = (routeHandlers: RouteHandlers): Router => {
  const r = Router()

  r.get('/ping', routeHandlers.ping)

  r.get('/about', routeHandlers.about)
  r.get('/collections', routeHandlers.collections)
  r.get('/collections/:id', routeHandlers.collection)
  r.get('/entries/:id', routeHandlers.entry)

  return r
}

