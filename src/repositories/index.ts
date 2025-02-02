import { Mongoose } from 'mongoose'
import { Logger } from 'winston'
import { ConfigSchema } from '../shared/config'
import { HealthRepository } from './HealthRepository'
import { getConnection } from './MongoAccess'
import { RenterRepository } from './RenterRepository'

const getRepositories = (mongoose: Mongoose, log: Logger) => ({
  renterRepository: new RenterRepository(mongoose, log),
  healthRepository: new HealthRepository(mongoose, log),
})

export type Repositories = ReturnType<typeof getRepositories>

export const initRepositories = async (config: ConfigSchema, log: Logger) => {
  const mongoose: Mongoose = await getConnection(config, log)
  const repositories = getRepositories(mongoose, log)
  return repositories
}

export default {
  initRepositories,
}
