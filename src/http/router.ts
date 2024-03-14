import { Request, Response, Router } from 'express'

type RouteHandler = (req: Request, res: Response) => void

type Route = {
  path: string,
  handler: RouteHandler,
}

export type RouteHandlers = {
  about: RouteHandler,
  collections: RouteHandler,
  collection: RouteHandler,
  entry: RouteHandler,
  ping: RouteHandler,
}

export const router = (routes: ReadonlyArray<Route>): Router => {
  const r = Router()
  routes.forEach((route) => r.get(route.path, route.handler))
  return r
}

