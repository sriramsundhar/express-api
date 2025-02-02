import { Mongoose } from 'mongoose'
import { Logger } from 'winston'
export class HealthRepository {
  log: Logger
  connected: boolean
  constructor(mongoose: Mongoose, log: Logger) {
    this.log = log.child({ module: HealthRepository.name })
    this.connected = mongoose.connection.readyState === 1
    mongoose.connection.on('disconnected', this.onDisconnected)
    mongoose.connection.on('reconnected', this.onConnect)
    mongoose.connection.on('close', this.onDisconnected)
  }

  onDisconnected = () => {
    this.log.error('mongo disconnected')
    this.connected = false
  }

  onConnect = () => {
    this.log.info('Connected to mongodb.')
    this.connected = true
  }
  async mongoConnectionStatus() {
    return Promise.resolve(this.connected)
  }
}
