import { Router } from 'express'

import {
  checkIn,
  checkOut,
  endLeave,
  find,
  startLeave,
  update,
} from '../controllers/system.controller.js'
import { protectAdmin, protectUser } from '../middlewares/auth.middleware.js'

export const router = Router()

router.get('/', protectAdmin, find)

router.post('/check-in', protectUser, checkIn)

router.post('/check-out', protectUser, checkOut)

router.post('/start-leave', protectUser, startLeave)

router.post('/end-leave', protectUser, endLeave)

router.patch('/:id', protectAdmin, update)
