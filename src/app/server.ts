import { createHttpServer } from '../http/create-server'
import * as Views from '../views'

export const makeServer = async (): Promise<void> => {
  const views = Views.instantiate()

  createHttpServer(views)
}

