import { Request, Router } from 'express'
import { Logger } from 'winston'
import { RentersManager } from '../managers/RentersManager'
import { IRenter } from '../shared/entities/Renter'
import { Controllers, asyncWrap } from './Controllers'
import { ConfigSchema } from '../shared/config'

class RentersController extends Controllers {
  rentersManager: RentersManager

  constructor(
    config: ConfigSchema,
    log: Logger,
    rentersManager: RentersManager
  ) {
    super(config, log.child({ module: RentersController.name }))
    this.rentersManager = rentersManager
  }

  getAllRenters = async (): Promise<IRenter[]> => {
    this.log.info('Getting Renters')
    return this.rentersManager.getAllRenters()
  }

  getRenterById = async (req: Request): Promise<IRenter | null> => {
    this.log.info('Getting Renter by id')
    const id = req.params.id
    this.log.info(`Renter id: ${id}`)
    return this.rentersManager.getRenterById(id)
  }
}

export const _initializeRouter = (
  config: ConfigSchema,
  logger: Logger,
  rentersManager: RentersManager
) => {
  const rentersController = new RentersController(
    config,
    logger,
    rentersManager
  )
  const router = Router()
  router.get('', asyncWrap(rentersController.getAllRenters))
  router.get('/:id', asyncWrap(rentersController.getRenterById))
  return router
}

module.exports = {
  _initializeRouter,
}
