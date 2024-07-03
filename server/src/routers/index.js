import { Router } from 'express'

import { router as userRouter } from './user.router.js'

export const router = Router()

router.use('/user', userRouter)
