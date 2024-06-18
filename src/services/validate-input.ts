import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as PR from 'io-ts/PathReporter'
import { JsonApiErrorsDocument } from './json-api/json-api-resource'

export const validateInput = <A>(codec: t.Decoder<unknown, A>) => (
  input: unknown,
): E.Either<JsonApiErrorsDocument, A> => pipe(
  input,
  codec.decode,
  E.mapLeft((errors) => ({
    errors: [{
      code: 'bad-input',
      title: PR.failure(errors).join('\n'),
      meta: {
        input: JSON.stringify(input),
      },
    }],
  })),
)

