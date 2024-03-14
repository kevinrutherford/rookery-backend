import { createServer } from 'http'
import cors from 'cors'
import express, { json } from 'express'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import helmet from 'helmet'
import { executeView } from './execute-view'
import { logRequest } from './log-request'
import * as L from './logger'
import { ping } from './ping'
import { router } from './router'
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
    RA.map((view) => ({ path: view.path, handler: executeView(logger)(view.view) })),
    RA.append({ path: '/ping', handler: ping }),
  )

  const server = createServer(express()
    .use(logRequest(logger))
    .use(helmet())
    .use(json())
    .use(cors())
    .use('/', router(routes)),
  )
  server.on('listening', (): void => logger.info('Server running'))
  server.on('close', (): void => logger.info('Server stopping'))
  startServer(logger)(server)
}

