import * as TE from 'fp-ts/TaskEither'
import { ErrorOutcome } from './error-outcome'
import { JsonApiResource } from '../views/json-api-resource'

type JsonApiDocument = {
  data: JsonApiResource | ReadonlyArray<JsonApiResource>,
  included?: ReadonlyArray<JsonApiResource>,
}

export type View = (isAuthenticated: boolean) => (input: unknown) => TE.TaskEither<ErrorOutcome, JsonApiDocument>

export type ViewPath = {
  path: string,
  view: View,
}

