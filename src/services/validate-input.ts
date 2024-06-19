import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as PR from 'io-ts/PathReporter'
import { JsonApiErrorsDocument } from './json-api/json-api-resource'
import { renderError } from './json-api/render-error'

export const validateInput = <A>(codec: t.Decoder<unknown, A>) => (
  input: unknown,
): E.Either<JsonApiErrorsDocument, A> => pipe(
  input,
  codec.decode,
  E.mapLeft((errors) => renderError('bad-input', PR.failure(errors).join('\n'), {
    input: JSON.stringify(input),
  })),
)

