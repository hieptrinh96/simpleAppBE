import mongoose from 'mongoose'

const Schema = mongoose.Schema

const goalSchema = new Schema({
  description: String,
  completed: Boolean,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
},
{timestamps: true})

const Goal = mongoose.model('Goal', goalSchema)

export {
  Goal
}