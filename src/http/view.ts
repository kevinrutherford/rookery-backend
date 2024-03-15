import { Json } from 'fp-ts/Json'
import * as TE from 'fp-ts/TaskEither'
import { ErrorOutcome } from './error-outcome'

export type View = (input: unknown) => TE.TaskEither<ErrorOutcome, Json>

export type ViewPath = {
  path: string,
  view: View,
}

