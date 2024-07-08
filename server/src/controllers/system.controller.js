import moment from 'moment'

import { asyncHandle } from '../utils/async-handler.js'
import { pool } from '../utils/db.js'

export const find = asyncHandle(async (req, res) => {
  const userDays = await pool.query(
    'SELECT user_days.id, user_day_details.id as d_id, name, start_hour, end_hour, status FROM user_days INNER JOIN users ON users.id = user_days.user_id INNER JOIN user_day_details ON user_days.id = user_day_details.day_id WHERE date = $1',
    [req.query.date]
  )
  res.send({ data: userDays.rows })
})

export const checkIn = asyncHandle(async (req, res) => {
  const userDay = await pool.query(
    `
      SELECT id FROM user_days 
      WHERE date = $1 AND user_id = $2
      `,
    [new Date(), req.user.id]
  )
  await pool.query(
    `
      INSERT INTO user_day_details 
      (start_hour, end_hour, status, day_id) 
      VALUES ($1, $2, $3, $4)
      `,
    [
      `${new Date().getHours()}:${new Date().getMinutes()}`,
      null,
      1,
      userDay.rows[0].id,
    ]
  )
  res.status(201).send({ data: 'Success' })
})

export const checkOut = asyncHandle(async (req, res) => {
  const userDay = await pool.query(
    `
      SELECT id FROM user_days 
      WHERE date = $1 AND user_id = $2
      `,
    [new Date(), req.user.id]
  )
  await pool.query(
    `
      UPDATE user_day_details 
      SET end_hour = $1
      WHERE day_id = $2 AND status = $3
      `,
    [
      `${new Date().getHours()}:${new Date().getMinutes()}`,
      userDay.rows[0].id,
      1,
    ]
  )
  res.status(201).send({ data: 'Success' })
})

export const startLeave = asyncHandle(async (req, res) => {
  const userDay = await pool.query(
    `
    SELECT id FROM user_days 
    WHERE date = $1 AND user_id = $2
    `,
    [new Date(), req.user.id]
  )
  await pool.query(
    `
      INSERT INTO user_day_details 
      (start_hour, end_hour, status, day_id) 
      VALUES ($1, $2, $3, $4)
      `,
    [
      `${new Date().getHours()}:${new Date().getMinutes()}`,
      null,
      2,
      userDay.rows[0].id,
    ]
  )
  res.status(201).send({ data: 'Success' })
})

export const endLeave = asyncHandle(async (req, res) => {
  const userDay = await pool.query(
    `
      SELECT id FROM user_days 
      WHERE date = $1 AND user_id = $2
      `,
    [new Date(), req.user.id]
  )
  await pool.query(
    `
      UPDATE user_day_details 
      SET end_hour = $1
      WHERE day_id = $2 AND status = $3
      `,
    [
      `${new Date().getHours()}:${new Date().getMinutes()}`,
      userDay.rows[0].id,
      2,
    ]
  )
  res.status(201).send({ data: 'Success' })
})

export const updateCheckIn = asyncHandle(async (req, res) => {
  const userDayDetail = await pool.query(
    'SELECT id FROM user_day_details WHERE status = 1 AND day_id = $1',
    [req.params.id]
  )
  if (userDayDetail.rowCount === 0)
    await pool.query(
      'INSERT INTO user_day_details (start_hour, end_hour, status, day_id) VALUES ($1, $2, $3, $4)',
      [req.body.startHour, req.body.endHour, 1, req.params.id]
    )
  else
    await pool.query(
      'UPDATE user_day_details SET start_hour = $1, end_hour = $2 WHERE id = $3',
      [req.body.startHour, req.body.endHour, userDayDetail.rows[0].id]
    )
  res.send({ data: 'Success' })
})

export const updateLeave = asyncHandle(async (req, res) => {
  if (req.body.startHour === null) {
    await pool.query(
      'DELETE FROM user_day_details WHERE day_id = $1 AND status = 2',
      [req.params.id]
    )
    return res.send({ data: 'Success' })
  }
  const userDayDetail = await pool.query(
    'SELECT id FROM user_day_details WHERE status = 2 AND day_id = $1',
    [req.params.id]
  )
  if (userDayDetail.rowCount === 0)
    await pool.query(
      'INSERT INTO user_day_details (start_hour, end_hour, status, day_id) VALUES ($1, $2, $3, $4)',
      [req.body.startHour, req.body.endHour, 2, req.params.id]
    )
  else
    await pool.query(
      'UPDATE user_day_details SET start_hour = $1, end_hour = $2 WHERE id = $3',
      [req.body.startHour, req.body.endHour, userDayDetail.rows[0].id]
    )
  res.send({ data: 'Success' })
})

export const updateAbsent = asyncHandle(async (req, res) => {
  if (req.body.startHour === null) {
    await pool.query(
      'DELETE FROM user_day_details WHERE day_id = $1 AND status = 3',
      [req.params.id]
    )
    return res.send({ data: 'Success' })
  }
  const userDayDetail = await pool.query(
    'SELECT id FROM user_day_details WHERE status = 3 AND day_id = $1',
    [req.params.id]
  )
  if (userDayDetail.rowCount === 0)
    await pool.query(
      'INSERT INTO user_day_details (start_hour, end_hour, status, day_id) VALUES ($1, $2, $3, $4)',
      [req.body.startHour, req.body.endHour, 3, req.params.id]
    )
  else
    await pool.query(
      'UPDATE user_day_details SET start_hour = $1, end_hour = $2 WHERE id = $3',
      [req.body.startHour, req.body.endHour, userDayDetail.rows[0].id]
    )
  res.send({ data: 'Success' })
})

export const getExcelForOne = asyncHandle(async (req, res) => {
  const userDays = await pool.query(
    'SELECT users.name, date, start_hour, end_hour, status FROM user_days INNER JOIN users ON users.id = user_days.user_id INNER JOIN user_day_details ON user_days.id = user_day_details.day_id WHERE date BETWEEN $1 AND $2 AND users.id = $3 ORDER BY date ASC',
    [req.query.startDate, req.query.endDate, req.query.userId]
  )
  res.send({ data: userDays.rows })
})
