import Router, { Middleware } from '@koa/router'

type RouteHandler = Middleware

export type Route = {
  path: string,
  handler: RouteHandler,
}

export const router = (routes: ReadonlyArray<Route>): Router => {
  const r = new Router()
  routes.forEach((route) => r.get(route.path, route.handler))
  return r
}

