import mongoose, { Schema } from 'mongoose'

export interface IRenter extends mongoose.Document {
  first_name: string
  last_name: string
  email: string
}

export const renterSchema = new Schema<IRenter>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})
