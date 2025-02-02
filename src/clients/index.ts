import { Logger } from 'winston'
import { ConfigSchema } from '../shared/config'
import { CommentsClient } from './CommentsClient'

const getClients = (config: ConfigSchema, logger: Logger) => ({
  commentsClient: new CommentsClient(config, logger),
})

export type Clients = ReturnType<typeof getClients>

export const initializeClients = (config: ConfigSchema, logger: Logger) => {
  const clients = getClients(config, logger)
  return clients
}
