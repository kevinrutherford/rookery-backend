import { Router } from 'express'
import { executeView } from './execute-view'
import { Logger } from './logger'
import ping from './ping'
import { Views } from '../views'

export const router = (views: Views, logger: Logger): Router => {
  const r = Router()

  r.get('/ping', ping())

  r.get('/collections', executeView(logger)(views.getCollections))

  return r
}

