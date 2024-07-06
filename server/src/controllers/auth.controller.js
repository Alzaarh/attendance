import { compare } from 'bcrypt'

import { asyncHandle } from '../utils/async-handler.js'
import { pool } from '../utils/db.js'
import { sign } from '../utils/jwt.js'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '12345'

export const userLogin = asyncHandle(async (req, res) => {
  const user = await pool.query(
    `
    SELECT users.id, users.name, users.password 
    FROM users 
    WHERE users.username = $1
    `,
    [req.body.username]
  )
  if (
    user.rowCount === 0 ||
    !(await compare(req.body.password, user.rows[0].password))
  )
    return res.status(400).send({ error: 'نام کاربری یا رمز عبور اشتباه است.' })
  const token = await sign({ user: { id: user.rows[0].id } })
  res.send({
    data: { token, name: user.rows[0].name },
  })
})

export const adminLogin = asyncHandle(async (req, res) => {
  if (
    req.body.username !== ADMIN_USERNAME ||
    req.body.password !== ADMIN_PASSWORD
  )
    return res.status(400).send({ error: 'نام کاربری یا رمز عبور اشتباه است.' })
  const token = await sign({ admin: true })
  return res.send({ data: token })
})
