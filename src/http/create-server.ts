import { createServer } from 'http'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import Koa from 'koa'
import { bearerToken } from 'koa-bearer-token'
import { executeView } from './execute-view'
import { logRequest } from './log-request'
import ping from './ping'
import { Route, router } from './router'
import { startServer } from './start-server'
import { ViewPath } from './view-path'
import { Logger } from '../logger'

export const createHttpServer = (logger: Logger, views: ReadonlyArray<ViewPath>): void => {

  const routes = pipe(
    views,
    RA.map((view) => ({
      path: view.path,
      handler: executeView(logger)(view.view),
    }) satisfies Route),
    RA.append({ path: '/ping', handler: ping() }),
  )

  const routery = router(routes)

  const app = new Koa()
  app.use(logRequest(logger))
  app.use(bearerToken())
  app.use(routery.routes())
  app.use(routery.allowedMethods())
  const server = createServer(app.callback())

  server.on('listening', (): void => logger.info('Server running'))
  server.on('close', (): void => logger.info('Server stopping'))
  startServer(logger)(server)
}

