import { Json } from 'fp-ts/Json'
import * as TE from 'fp-ts/TaskEither'
import { ErrorOutcome } from './error-outcome'
import { JsonApiResource } from '../views/json-api-resource'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type JsonApiDocument = {
  data: JsonApiResource | ReadonlyArray<JsonApiResource>,
  included?: ReadonlyArray<JsonApiResource>,
}

export type View = (input: unknown) => TE.TaskEither<ErrorOutcome, Json>

export type ViewPath = {
  path: string,
  view: View,
}

