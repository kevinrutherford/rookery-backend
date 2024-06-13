import * as O from 'fp-ts/Option'

type Community = {
  id: string,
  name: string,
  affiliation: string,
  overview: ReadonlyArray<string>,
}

export type Readmodel = {
  data: O.Option<Community>,
}

