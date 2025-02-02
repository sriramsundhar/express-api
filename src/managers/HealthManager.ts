import { Logger } from 'winston'
import { HealthRepository } from '../repositories/HealthRepository'
import { ConfigSchema } from '../shared/config'
import { Manager } from './Manager'

export class HealthManager extends Manager {
  healthRepository: HealthRepository
  constructor(
    config: ConfigSchema,
    log: Logger,
    healthRepository: HealthRepository
  ) {
    super(config, log.child({ module: HealthManager.name }))
    this.healthRepository = healthRepository
  }

  getAppHealth = async () => {
    const mongoHealth = await this.healthRepository.mongoConnectionStatus()
    const health = {
      app: true,
      mongo: mongoHealth,
    }
    return Object.values(health).some((value) => !value)
      ? Promise.reject(JSON.stringify(health))
      : Promise.resolve(health)
  }
}
