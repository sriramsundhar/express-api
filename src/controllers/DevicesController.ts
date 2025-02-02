import { Router } from 'express'
import { Logger } from 'winston'
import { DevicesManager } from '../managers/DevicesManager'
import { ConfigSchema } from '../shared/config'
import { asyncWrap, Controllers } from './Controllers'

class DevicesController extends Controllers {
  deviceManager: DevicesManager

  constructor(
    config: ConfigSchema,
    log: Logger,
    deviceManager: DevicesManager
  ) {
    super(config, log.child({ module: DevicesController.name }))
    this.deviceManager = deviceManager
  }

  getPhones = async (): Promise<string[]> => {
    this.log.info('Getting phones')
    return await this.deviceManager.getPhones()
  }
}

export const _initializeRouter = (
  config: ConfigSchema,
  logger: Logger,
  deviceManager: DevicesManager
) => {
  const deviceController = new DevicesController(config, logger, deviceManager)
  const router = Router()
  router.get('/phones', asyncWrap(deviceController.getPhones))
  return router
}
module.exports = {
  _initializeRouter,
}
