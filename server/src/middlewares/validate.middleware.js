import { validationResult } from 'express-validator'
import { matchedData } from 'express-validator'

export function validate(req, res, next) {
  const error = validationResult(req)
  if (!error.isEmpty()) return res.status(400).send({ errors: error.array() })
  req.body = matchedData(req)
  next()
}
