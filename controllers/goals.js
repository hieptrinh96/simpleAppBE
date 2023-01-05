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

export {
  create
}