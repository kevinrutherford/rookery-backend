import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as PR from 'io-ts/PathReporter'
import { ErrorDocument } from './service'

export const validateInput = <A>(codec: t.Decoder<unknown, A>) => (
  input: unknown,
): E.Either<ErrorDocument, A> => pipe(
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

