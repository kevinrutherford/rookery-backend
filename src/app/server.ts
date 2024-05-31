import * as Readmodels from '../domain-model'
import { createHttpServer } from '../http'
import * as Views from '../views'

export const makeServer = async (): Promise<void> => {
  const queries = Readmodels.instantiate()
  const views = Views.instantiate(queries)

  createHttpServer(views)
}

