import { Router } from 'express'
import { Logger } from 'winston'

import { Managers } from '../managers'
import { ConfigSchema } from '../shared/config'
import * as deviceController from './DevicesController'
import * as healthController from './HealthController'
import * as openApiController from './OpenApiController'
import * as rentersController from './RentersController'

export const initializeControllers = (
  config: ConfigSchema,
  logger: Logger,
  managers: Managers
): Map<string, Router> => {
  const controllers: Map<string, Router> = new Map<string, Router>()
  controllers.set(
    '/devices',
    deviceController._initializeRouter(config, logger, managers.deviceManger)
  )
  controllers.set(
    '/renters',
    rentersController._initializeRouter(config, logger, managers.rentersManager)
  )
  controllers.set(
    '/health',
    healthController._initializeRouter(config, logger, managers.healthManager)
  )
  controllers.set(
    '/api-doc',
    openApiController._initializeRouter(config, logger)
  )
  return controllers
}

export default {
  initializeControllers,
}
