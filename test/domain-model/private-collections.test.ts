import * as Logger from '../../src/logger'
import * as UnrestrictedDomain from '../../src/unrestricted-domain'
import { arbitraryDate, arbitraryString, arbitraryWord } from '../helpers'

const mkEvent = (type: string, data: Record<string, unknown>) => ({
  created: arbitraryDate(),
  type,
  data,
})

describe('private collections', () => {
  describe('when a public collection becomes private', () => {
    const collectionId = arbitraryWord()
    const domain = UnrestrictedDomain.instantiate(Logger.instantiate())
    domain.handleEvent(mkEvent('collection-created', {
      id: collectionId,
      name: arbitraryString(),
      description: arbitraryString(),
    }))
    domain.handleEvent(mkEvent('collection-updated', {
      collectionId,
      attributes: {
        isPrivate: true,
      },
    }))
    const activities = domain.queries.getLocalTimeline()

    it('all earlier activities remain public', () => {
      expect(activities[0].isPrivate).toBe(false)
    })

    it.todo('all future activities are private')
  })

  describe('when a private collection becomes public', () => {
    it.todo('all earlier activities remain private')

    it.todo('all future activities are public')
  })
})

