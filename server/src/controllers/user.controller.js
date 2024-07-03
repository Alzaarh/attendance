import { hash } from 'bcrypt'

import { asyncHandle } from '../utils/async-handler.js'
import { pool } from '../utils/db.js'

export const find = asyncHandle(async (_req, res) => {
  const users = await pool.query('SELECT id,username,name FROM users')
  res.send({ data: users.rows })
})

export const create = asyncHandle(async (req, res) => {
  if (
    (await pool.query('SELECT id FROM users WHERE username = $1', [req.body.username])).rowCount > 0
  )
    return res.status(400).send({ error: 'نام کاربری قبلا استفاده شده است.' })
  await pool.query('INSERT INTO users (username, name, password) VALUES ($1, $2, $3)', [
    req.body.username,
    req.body.name,
    await hash(req.body.password, 12),
  ])
  res.status(201).send({ data: 'Success' })
})

export const update = asyncHandle(async (req, res) => {
  if (req.body.password) {
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
      await hash(req.body.password, 12),
      req.params.id,
    ])
  } else {
    await pool.query('UPDATE users SET username = $1, name = $2 WHERE id = $3', [
      req.body.username,
      req.body.name,
      req.params.id,
    ])
  }
  res.send({ data: 'Success' })
})

export const destroy = asyncHandle(async (req, res) => {
  await pool.query('DELETE FROM users WHERE id = $1', [req.params.id])
  res.send({ data: 'Success' })
})
