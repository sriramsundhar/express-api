import { Mongoose } from 'mongoose'
import { Logger } from 'winston'
import { IRenter, renterSchema } from '../shared/entities/Renter'
import { Repository } from './Repository'

export class RenterRepository extends Repository<IRenter> {
  constructor(mongoose: Mongoose, log: Logger) {
    const schema = mongoose.connection.model<IRenter>('renters', renterSchema)
    super(schema, log.child({ module: RenterRepository.name }))
  }
}
