import { Logger } from 'winston'
import { CommentsClient } from '../clients/CommentsClient'
import { ConfigSchema } from '../shared/config'
import { Manager } from './Manager'

export class DevicesManager extends Manager {
  commentsClient: CommentsClient

  constructor(
    config: ConfigSchema,
    log: Logger,
    commentsClient: CommentsClient
  ) {
    super(config, log.child({ module: DevicesManager.name }))
    this.commentsClient = commentsClient
  }

  async getPhones(): Promise<string[]> {
    return this.commentsClient.getPhones()
  }
}
