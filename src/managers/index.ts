import { Logger } from 'winston'
import { Clients } from '../clients'
import { Repositories } from '../repositories'
import { ConfigSchema } from '../shared/config'
import { DevicesManager } from './DevicesManager'
import { HealthManager } from './HealthManager'
import { RentersManager } from './RentersManager'

const getManagers = ({
  clients,
  config,
  logger,
  repos,
}: {
  clients: Clients
  config: ConfigSchema
  logger: Logger
  repos: Repositories
}) => ({
  deviceManger: new DevicesManager(config, logger, clients.commentsClient),
  rentersManager: new RentersManager(config, logger, repos.renterRepository),
  healthManager: new HealthManager(config, logger, repos.healthRepository),
})

export type Managers = ReturnType<typeof getManagers>

export const initializeManagers = (
  config: ConfigSchema,
  logger: Logger,
  repos: Repositories,
  clients: Clients
) => {
  const managers = getManagers({ clients, config, logger, repos })
  return managers
}
