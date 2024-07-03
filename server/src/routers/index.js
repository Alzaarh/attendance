import { Router } from 'express'

import { router as authRouter } from './auth.router.js'
import { router as systemRouter } from './system.router.js'
import { router as userRouter } from './user.router.js'

export const router = Router()

router.use('/auth', authRouter)

router.use('/user', userRouter)

router.use('/system', systemRouter)
