import { Server } from 'http'
import { createTerminus } from '@godaddy/terminus'
import { Logger } from './logger'

export const startServer = (logger: Logger) => (server: Server): void => {
  createTerminus(server, {
    onShutdown: async () => { logger.info('Shutting server down') },
    onSignal: async () => { logger.info('Signal received') },
    signals: ['SIGINT', 'SIGTERM'],
  })
  logger.info('Server listening', { port: 44002 })
  server.listen(44002)
}

