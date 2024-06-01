import * as TE from 'fp-ts/TaskEither'
import { JsonApiDocument } from './json-api-resource'

export type ErrorOutcome = {
  category: 'bad-input' | 'not-found',
  message: string,
  evidence: Record<string, unknown>,
}

export type View = (isAuthenticated: boolean) => (input: unknown) => TE.TaskEither<ErrorOutcome, JsonApiDocument>

export type ViewPath = {
  path: string,
  view: View,
}

