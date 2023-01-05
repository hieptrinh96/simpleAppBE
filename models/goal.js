import mongoose from 'mongoose'

const Schema = mongoose.Schema

const goalSchema = new Schema({
  description: String,
  completed: Boolean,
})

const Goal = mongoose.model('Goal', goalSchema)

export {
  Goal
}