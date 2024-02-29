import { createHttpServer } from '../http/create-server'
import { allCollections } from '../readmodels/all-collections'
import * as Views from '../views'

export const makeServer = async (): Promise<void> => {
  const queries = {
    allCollections,
  }
  const views = Views.instantiate(queries)

  createHttpServer(views)
}

