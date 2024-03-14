import { Request, Response, Router } from 'express'

type RouteHandler = (req: Request, res: Response) => void

type Route = {
  path: string,
  handler: RouteHandler,
}

export const router = (routes: ReadonlyArray<Route>): Router => {
  const r = Router()
  routes.forEach((route) => r.get(route.path, route.handler))
  return r
}

