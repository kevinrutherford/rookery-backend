describe('visibility of works', () => {
  describe('given a public collection and a private collection', () => {
    describe('and a Work entered only in the public collection', () => {
      describe('the work is visible to an unauthenticated client', () => {
        it.todo('via /works')
        it.todo('via /works/:id')
      })
    })

    describe('and a Work entered only in the private collection', () => {
      describe('the work is visible to an authenticated client', () => {
        it.todo('via /works')
        it.todo('via /works/:id')
      })

      describe('the work is not visible to an unauthenticated client', () => {
        it.todo('via /works')
        it.todo('via /works/:id')
      })
    })

    describe('and a Work entered in both collections', () => {
      describe('the work is visible to an unauthenticated client', () => {
        it.todo('via /works')
        it.todo('via /works/:id')
      })
    })
  })
})

