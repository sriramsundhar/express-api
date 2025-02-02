import { Logger, createLogger, format, transports } from 'winston'
import { ConfigSchema } from '../config'

export const getLogger = (config: ConfigSchema) => {
  const level: string = config.get('log.level')
  const appName: string = config.get('app.name')
  const env: string = config.get('env')
  const logger: Logger = createLogger({
    level: level,
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: {
      service: appName,
      env: env,
    },
    transports: [new transports.Console()],
  })
  return logger
}

module.exports = {
  getLogger,
}
