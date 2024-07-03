import { Router } from 'express'
import { body } from 'express-validator'

import { create, destroy, find, update } from '../controllers/user.controller.js'
import { validate } from '../middlewares/validate.middleware.js'

export const router = Router()

router.get('/', find)

router.post(
  '/',
  [
    body('username').isString().notEmpty(),
    body('name').isString().notEmpty(),
    body('password').isString().notEmpty(),
    body('startHour').isString().optional(),
    body('endHour').isString().optional(),
    validate,
  ],
  create
)

router.patch('/:id', update)

router.delete('/:id', destroy)
