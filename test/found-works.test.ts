import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { dummyReporter } from './dummy-reporter'
import { mkEvent } from './mk-event'
import { Authority } from '../src/auth/authority'
import { getWorks } from '../src/services/work/works'
import * as UnrestrictedDomain from '../src/unrestricted-domain'

const mustBeOnTheRight = (
  E.getOrElseW((errors) => { throw new Error(`should not happen: ${JSON.stringify(errors)}`) })
)

const always: Authority = () => true

describe('given a Work that has been found on Crossref', () => {
  const domain = UnrestrictedDomain.instantiate(dummyReporter)
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

  it('can be filtered out', () => {
    const response = pipe(
      {
        'filter[crossrefStatus]': 'not-determined',
      },
      getWorks(domain.queries)(always),
      mustBeOnTheRight,
    )
    expect('data' in response && response.data).toHaveLength(0)
  })

  it('can be filtered in', () => {
    const response = pipe(
      {
        'filter[crossrefStatus]': 'found',
      },
      getWorks(domain.queries)(always),
      mustBeOnTheRight,
    )
    expect('data' in response && response.data).toHaveLength(1)
  })
})

