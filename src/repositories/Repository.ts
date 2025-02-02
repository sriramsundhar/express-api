import mongoose from 'mongoose'
import { Logger } from 'winston'

export class Repository<T extends mongoose.Document> {
  model: mongoose.Model<T>
  log: Logger

  constructor(schemaModel: mongoose.Model<T>, log: Logger) {
    this.model = schemaModel
    this.log = log
  }

  create(item: T): Promise<T> {
    return this.model.create(item)
  }

  findById(_id: string): Promise<T | null> {
    return this.model.findById(_id).exec()
  }

  getAll(): Promise<T[]> {
    return this.model.find().exec()
  }
}
