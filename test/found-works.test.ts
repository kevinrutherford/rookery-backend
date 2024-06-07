import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { arbitraryDate } from './helpers'
import { Authority } from '../src/auth/authority'
import * as DomainModel from '../src/domain-model'
import * as Logger from '../src/logger'
import { getWorks } from '../src/views/work/works'

const mkEvent = (type: string, data: Record<string, unknown>) => ({
  created: arbitraryDate(),
  type,
  data,
})

const always: Authority = () => true

describe('given a Work that has been found on Crossref', () => {
  const domain = DomainModel.instantiate(Logger.instantiate())
  domain.handleEvent(mkEvent('work-updated', {
    workId: '10.1126/science.1172133',
    attributes: {
      crossrefStatus: 'found',
      title: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems',
      abstract: '<jats:p>A major problem worldwide is the potential loss of fisheries, forests, and water resources. Understanding of the processes that lead to improvements in or deterioration of natural resources is limited, because scientific disciplines use different concepts and languages to describe and explain complex social-ecological systems (SESs). Without a common framework to organize findings, isolated knowledge does not cumulate. Until recently, accepted theory has assumed that resource users will never self-organize to maintain their resources and that governments must impose solutions. Research in multiple disciplines, however, has found that some government policies accelerate resource destruction, whereas some resource users have invested their time and energy to achieve sustainability. A general framework is used to identify 10 subsystem variables that affect the likelihood of self-organization in efforts to achieve a sustainable SES.</jats:p>',
      authors: [
        'Elinor Ostrom',
      ],
    },
  }))

  it('can be filtered out', async () => {
    const response = await pipe(
      {
        'filter[crossrefStatus]': 'not-determined',
      },
      getWorks(domain.queries)(always),
      TE.getOrElse((errors) => { throw new Error(`should not happen: ${JSON.stringify(errors)}`) }),
    )()
    expect(response.data).toHaveLength(0)
  })

  it('can be filtered in', async () => {
    const response = await pipe(
      {
        'filter[crossrefStatus]': 'found',
      },
      getWorks(domain.queries)(always),
      TE.getOrElse((errors) => { throw new Error(`should not happen: ${JSON.stringify(errors)}`) }),
    )()
    expect(response.data).toHaveLength(1)
  })
})

