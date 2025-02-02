import mongoose from 'mongoose'
import { Logger } from 'winston'
import { ConfigSchema } from '../shared/config'
import { AppError } from '../shared/errors'

export const getConnection = async (config: ConfigSchema, log: Logger) => {
  try {
    mongoose.connection.on('error', (err: Error) => {
      log.error(`mongo connection err ${err}`, err)
      throw err
    })
    mongoose.connection.on('connected', () => {
      log.info('Conected to mongodb.')
    })
    const mongooseConnection = await mongoose.connect(config.get('mongo.url'))
    return mongooseConnection
  } catch (error) {
    log.error('Mongo error', error)
    throw new AppError('Error connecting to mongodb')
  }
}
