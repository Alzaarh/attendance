import { Router } from 'express'

import {
  checkIn,
  checkOut,
  endLeave,
  find,
  getExcelForOne,
  startLeave,
  updateAbsent,
  updateCheckIn,
  updateLeave,
} from '../controllers/system.controller.js'
import { protectAdmin, protectUser } from '../middlewares/auth.middleware.js'

export const router = Router()

router.get('/', protectAdmin, find)

router.get('/excel', protectAdmin, getExcelForOne)

router.post('/check-in', protectUser, checkIn)

router.post('/check-out', protectUser, checkOut)

router.post('/start-leave', protectUser, startLeave)

router.post('/end-leave', protectUser, endLeave)

router.put('/:id/check-in', protectAdmin, updateCheckIn)

router.put('/:id/leave', protectAdmin, updateLeave)

router.put('/:id/absent', protectAdmin, updateAbsent)
