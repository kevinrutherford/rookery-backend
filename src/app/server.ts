import { createHttpServer } from '../http/create-server'
import { instantiate as instantiateViews } from '../views'

export const makeServer = async (): Promise<void> => {
  const views = instantiateViews()

  createHttpServer(views)
}

