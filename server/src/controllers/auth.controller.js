import { compare } from 'bcrypt'

import { asyncHandle } from '../utils/async-handler.js'
import { pool } from '../utils/db.js'
import { sign } from '../utils/jwt.js'

export const userLogin = asyncHandle(async (req, res) => {
  const user = await pool.query('SELECT id,password FROM users WHERE username = $1', [
    req.body.username,
  ])
  if (user.rowCount === 0 || !(await compare(req.body.password, user.rows[0].password)))
    return res.status(400).send({ error: 'نام کاربری یا رمز عبور اشتباه است.' })
  const token = await sign({ user: { id: user.rows[0].id } })
  res.send({ data: token })
})
