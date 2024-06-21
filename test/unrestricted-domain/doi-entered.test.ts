import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { dummyReporter } from '../dummy-reporter'
import { arbitraryWord } from '../helpers'
import { mkEvent } from '../mk-event'

describe('doi-entered event', () => {
  describe('when the collection does not exist', () => {
    const domain = UnrestrictedDomain.instantiate(dummyReporter)
    domain.handleEvent(mkEvent('doi-entered', {
      id: arbitraryWord(),
      workId: arbitraryWord(),
      collectionId: arbitraryWord(),
    }))
    const activities = domain.queries.getLocalTimeline()

    it.failing('does not change the domain model', () => {
      expect(activities).toHaveLength(0)
    })
  })
})

