import { Logger } from 'winston'
import { RenterRepository } from '../repositories/RenterRepository'
import { ConfigSchema } from '../shared/config'
import { IRenter } from '../shared/entities/Renter'
import { Manager } from './Manager'

export class RentersManager extends Manager {
  rentersRepository: RenterRepository
  constructor(
    config: ConfigSchema,
    log: Logger,
    rentersRepository: RenterRepository
  ) {
    super(config, log.child({ module: RentersManager.name }))
    this.rentersRepository = rentersRepository
  }

  async getAllRenters(): Promise<IRenter[]> {
    return this.rentersRepository.getAll()
  }

  async getRenterById(id: string): Promise<IRenter | null> {
    return this.rentersRepository.findById(id)
  }
}
