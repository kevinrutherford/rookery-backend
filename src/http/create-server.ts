import { createServer } from 'http'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import Koa from 'koa'
import { executeView } from './execute-view'
import { logRequest } from './log-request'
import * as L from './logger'
import ping from './ping'
import { Route, router } from './router'
import { startServer } from './start-server'
import { ViewPath } from './view'

export const createHttpServer = (views: ReadonlyArray<ViewPath>): void => {
  const logger = L.create({
    emit: (s: string) => process.stdout.write(s),
    colour: process.env.NODE_ENV !== 'production',
    level: process.env.LOG_LEVEL ?? 'debug',
  })

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
  app.use(routery.routes())
  app.use(routery.allowedMethods())
  const server = createServer(app.callback())

  server.on('listening', (): void => logger.info('Server running'))
  server.on('close', (): void => logger.info('Server stopping'))
  startServer(logger)(server)
}

