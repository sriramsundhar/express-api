import { Router } from 'express'
import { Logger } from 'winston'
import { HealthManager } from '../managers/HealthManager'
import { ConfigSchema } from '../shared/config'
import { asyncWrap, Controllers } from './Controllers'

class HealthController extends Controllers {
  healthManager: HealthManager
  constructor(config: ConfigSchema, log: Logger, healthManager: HealthManager) {
    super(config, log.child({ module: HealthController.name }))
    this.healthManager = healthManager
  }

  healthCheck = async () => {
    this.log.info('Health check')
    return this.healthManager.getAppHealth()
  }
}

export const _initializeRouter = (
  config: ConfigSchema,
  logger: Logger,
  healthManager: HealthManager
) => {
  const healthController = new HealthController(config, logger, healthManager)
  const router = Router()
  router.get('', asyncWrap(healthController.healthCheck))
  return router
}

module.exports = {
  _initializeRouter,
}
