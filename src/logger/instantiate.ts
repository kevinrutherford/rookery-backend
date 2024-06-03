import { create, Logger } from './logger'

export const instantiate = (): Logger => create({
  emit: (s: string) => process.stdout.write(s),
  colour: process.env.NODE_ENV !== 'production',
  level: process.env.LOG_LEVEL ?? 'debug',
})

