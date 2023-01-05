import { Router } from "express";
import * as goalCtrl from '../controllers/goals.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

router.use(decodeUserFromToken)

router.post('/', goalCtrl.create)

export {
  router
}