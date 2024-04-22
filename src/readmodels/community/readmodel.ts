import * as O from 'fp-ts/Option'

export type Community = {
  name: string,
  affiliation: string,
  overview: string,
}

export type Readmodel = O.Option<Community>

