import { Router } from 'express'
import { body } from 'express-validator'

import { adminLogin, userLogin } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.middleware.js'

export const router = Router()

router.post(
  '/user/login',
  [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),
    validate,
  ],
  userLogin
)

router.post(
  '/admin/login',
  [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),
    validate,
  ],
  adminLogin
)
