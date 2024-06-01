import * as DomainModel from '../../src/domain-model'
import { arbitraryDate, arbitraryString, arbitraryWord } from '../helpers'

const mkEvent = (type: string, data: Record<string, unknown>) => ({
  created: arbitraryDate(),
  type,
  data,
})

describe('private collections', () => {
  describe('when a public collection becomes private', () => {
    const collectionId = arbitraryWord()
    const domain = DomainModel.instantiate()
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
    const activities = domain.queries.getLocalTimeline(true)

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

