export type Authority = (scope: 'browse-private-collections') => boolean

export const instantiate = (context: string | undefined): Authority => () => (
  context !== undefined
  && context === process.env.DEVELOPMENT_BEARER_TOKEN
)

