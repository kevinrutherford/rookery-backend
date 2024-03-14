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

  const routes = [
    { route: '/ping', handler: routeHandlers.ping },
    { route: '/about', handler: routeHandlers.about },
    { route: '/collections', handler: routeHandlers.collections },
    { route: '/collections/:id', handler: routeHandlers.collection },
    { route: '/entries/:id', handler: routeHandlers.entry },
  ]

  routes.forEach((route) => r.get(route.route, route.handler))

  return r
}

