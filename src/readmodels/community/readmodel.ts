import * as O from 'fp-ts/Option'

export type Community = {
  id: string,
  name: string,
  affiliation: string,
  overview: string,
}

export type Readmodel = O.Option<Community>

