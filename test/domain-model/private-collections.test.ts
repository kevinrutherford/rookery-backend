import { getLocalTimeline } from '../../src/domain-model/local-timeline/get-local-timeline'
import { handleEvent } from '../../src/domain-model/local-timeline/handle-event'
import { Readmodel } from '../../src/domain-model/local-timeline/readmodel'

describe('private collections', () => {
  describe('when a public collection becomes private', () => {
    const model: Readmodel = []
    handleEvent(model)({
      streamId: '1',
      id: '1',
      created: new Date(),
      isJson: true,
      revision: BigInt(1),
      type: 'collection-created',
      data: {
        id: 'abc',
        name: 'abc',
        description: 'abc',
      },
      metadata: undefined,
    })
    handleEvent(model)({
      streamId: '1',
      id: '1',
      created: new Date(),
      isJson: true,
      revision: BigInt(2),
      type: 'collection-updated',
      data: {
        collectionId: 'abc',
        attributes: {
          isPrivate: true,
        },
      },
      metadata: undefined,
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

