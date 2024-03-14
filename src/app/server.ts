import { createHttpServer } from '../http'
import * as Readmodels from '../readmodels'
import * as Views from '../views'
import { View } from '../views'

export const makeServer = async (): Promise<void> => {
  const queries = Readmodels.instantiate()
  const views = Views.instantiate(queries)

  const v: ReadonlyArray<{ path: string, view: View }> = [
    { path: '/about', view: views.getAbout },
    { path: '/collections', view: views.getCollections },
    { path: '/collections/:id', view: views.getCollection },
    { path: '/entries/:id', view: views.getEntry },
  ]

  createHttpServer(v)
}

