import { hash } from 'bcrypt'

import { asyncHandle } from '../utils/async-handler.js'
import { pool } from '../utils/db.js'

export const find = asyncHandle(async (_req, res) => {
  const users = await pool.query('SELECT * FROM users')
  res.send({ data: users.rows })
})

export const create = asyncHandle(async (req, res) => {
  const user = await pool.query('SELECT id FROM users WHERE username = $1', [
    req.body.username,
  ])
  if (user.rowCount > 0)
    return res.status(400).send({ error: 'نام کاربری قبلا استفاده شده است.' })
  await pool.query(
    'INSERT INTO users (username, name, password, startHour, endHour) VALUES ($1, $2, $3, $4, $5)',
    [
      req.body.username,
      req.body.name,
      await hash(req.body.password, 12),
      req.body.startHour ?? '8:00',
      req.body.endHour ?? '16:00',
    ]
  )
  res.status(201).send({ data: 'Success' })
})

export const update = asyncHandle(async (req, res) => {
  const user = await pool.query(
    `
    SELECT password 
    FROM users
    WHERE id = $1
    `,
    [req.params.id]
  )
  if (user.rowCount === 0)
    return res.status(404).send({ error: 'کاربری یافت نشد.' })
  let hashed = user.rows[0].password
  if (req.body.password) hashed = await hash(req.body.password, 12)
  await pool.query(
    `
    UPDATE users 
    SET username = $1, name = $2, password = $3, starthour = $4, endhour = $5 
    WHERE id = $6
    `,
    [
      req.body.username,
      req.body.name,
      hashed,
      req.body.startHour,
      req.body.endHour,
      req.params.id,
    ]
  )
  res.send({ data: 'Success' })
})

export const destroy = asyncHandle(async (req, res) => {
  await pool.query('DELETE FROM users WHERE id = $1', [req.params.id])
  res.send({ data: 'Success' })
})
