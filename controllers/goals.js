import { Profile } from "../models/profile.js";
import { Goal } from "../models/goal.js";

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile;
    const goal = await Goal.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { goals: goal}},
      { new: true }
    )
    goal.owner = profile
    res.status(201).json(goal)
  } catch(error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const goals = await Goal.find({})
    res.status(200).json(goals)
  } catch(error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json(goal)
  } catch(error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.goals.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(goal)
  } catch(error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id)
    res.status(200).json(goal)
  } catch(error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  update,
  deleteGoal as delete,
  show
}