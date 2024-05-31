import { getLocalTimeline } from '../../src/domain-model/local-timeline/get-local-timeline'
import { handleEvent } from '../../src/domain-model/local-timeline/handle-event'
import { Readmodel } from '../../src/domain-model/local-timeline/readmodel'
import { arbitraryDate, arbitraryString, arbitraryWord } from '../helpers'

describe('private collections', () => {
  describe('when a public collection becomes private', () => {
    const collectionId = arbitraryWord()
    const model: Readmodel = []
    handleEvent(model)({
      created: arbitraryDate(),
      type: 'collection-created',
      data: {
        id: collectionId,
        name: arbitraryString(),
        description: arbitraryString(),
      },
    })
    handleEvent(model)({
      created: arbitraryDate(),
      type: 'collection-updated',
      data: {
        collectionId,
        attributes: {
          isPrivate: true,
        },
      },
    })
    const activities = getLocalTimeline(model)(true)

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

