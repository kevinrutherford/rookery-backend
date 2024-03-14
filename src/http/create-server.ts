import { createServer } from 'http'
import cors from 'cors'
import express, { json } from 'express'
import helmet from 'helmet'
import { executeView } from './execute-view'
import { logRequest } from './log-request'
import * as L from './logger'
import { ping } from './ping'
import { RouteHandlers, router } from './router'
import { startServer } from './start-server'
import { Views } from '../views'

export const createHttpServer = (views: Views): void => {
  const logger = L.create({
    emit: (s: string) => process.stdout.write(s),
    colour: process.env.NODE_ENV !== 'production',
    level: process.env.LOG_LEVEL ?? 'debug',
  })

  const routeHandlers: RouteHandlers = {
    about: executeView(logger)(views.getAbout),
    collections: executeView(logger)(views.getCollections),
    collection: executeView(logger)(views.getCollection),
    entry: executeView(logger)(views.getEntry),
    ping,
  }

  const routes = [
    { path: '/ping', handler: routeHandlers.ping },
    { path: '/about', handler: routeHandlers.about },
    { path: '/collections', handler: routeHandlers.collections },
    { path: '/collections/:id', handler: routeHandlers.collection },
    { path: '/entries/:id', handler: routeHandlers.entry },
  ]

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

