import { compare } from 'bcrypt'

import { asyncHandle } from '../utils/async-handler.js'
import { pool } from '../utils/db.js'
import { sign } from '../utils/jwt.js'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '12345'

export const userLogin = asyncHandle(async (req, res) => {
  const user = await pool.query(
    `
    SELECT users.id, users.password 
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
  const userDays = await pool.query(
    `
    SELECT user_days.hour, user_days.event
    FROM user_days
    INNER JOIN user_day_details ON user_days.id = user_day_details.day_id
    WHERE user_days.date = $1 AND user_days.user_id = $2
    ORDER BY user_day_details.hour ASC
    `,
    [new Date(), user.rows[0].id]
  )
  console.log(userDay.rows)
  const token = await sign({ user: { id: user.rows[0].id } })
  res.send({
    data: {
      token,
      status:
        userDays.rowCount === 0
          ? 1
          : userDays.rows.slice(-1)[0].status === 1
          ? 2
          : 1,
    },
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
