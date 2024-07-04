import { Router } from 'express'
import { body } from 'express-validator'

import {
  create,
  destroy,
  find,
  update,
} from '../controllers/user.controller.js'
import { protectAdmin } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'

export const router = Router()

router.get('/', protectAdmin, find)

router.post(
  '/',
  protectAdmin,
  [
    body('username').isString().notEmpty(),
    body('name').isString().notEmpty(),
    body('password').isString().notEmpty(),
    body('startHour').isString().notEmpty(),
    body('endHour').isString().notEmpty(),
    validate,
  ],
  create
)

router.put(
  '/:id',
  protectAdmin,
  [
    body('username').isString().notEmpty(),
    body('name').isString().notEmpty(),
    body('password').isString().optional(),
    body('startHour').isString().notEmpty(),
    body('endHour').isString().notEmpty(),
    validate,
  ],
  update
)

router.delete('/:id', protectAdmin, destroy)
