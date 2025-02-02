import { Logger } from 'winston'
import { ConfigSchema } from '../shared/config'

export class Manager {
  config: ConfigSchema
  log: Logger
  constructor(config: ConfigSchema, log: Logger) {
    this.config = config
    this.log = log
  }
}
