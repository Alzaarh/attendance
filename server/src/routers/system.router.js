import { Router } from 'express'

import {
  checkIn,
  checkOut,
  endLeave,
  find,
  startLeave,
} from '../controllers/system.controller.js'
import { protectUser } from '../middlewares/auth.middleware.js'

export const router = Router()

router.get('/', find)

router.post('/check-in', protectUser, checkIn)

router.post('/check-out', protectUser, checkOut)

router.post('/start-leave', protectUser, startLeave)

router.post('/end-leave', protectUser, endLeave)
