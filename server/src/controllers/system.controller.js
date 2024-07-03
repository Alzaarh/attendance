import moment from 'moment'

import { asyncHandle } from '../utils/async-handler.js'
import { pool } from '../utils/db.js'

export const find = asyncHandle(async (req, res) => {
  const userDays = await pool.query(
    `SELECT user_days.id,status,date,name,hour,event,startHour,endHour 
    FROM user_days 
    INNER JOIN users ON users.id=user_days.user_id 
    INNER JOIN user_day_details ON user_days.id=user_day_details.day_id 
    WHERE date=$1`,
    [req.query.date ?? new Date()]
  )
  const response = []
  userDays.rows.forEach((userDay) => {
    let diff = 0
    if (!response.find((d) => d.id === userDay.id)) {
      diff += moment(userDay.date)
        .add(
          userDays.rows
            .filter((d) => d.id === userDay.id && d.event === 1)
            .sort()
            .slice(-1)[0].hour,
          'hours'
        )
        .diff(moment(userDay.date).add(userDay.starthour, 'hours'))
      diff += moment(userDay.date)
        .add(
          userDays.rows.filter((d) => d.id === userDay.id && d.event === 2).sort()[0].hour,
          'hours'
        )
        .diff(moment(userDay.date).add(userDay.endhour, 'hours'))
      response.push({
        id: userDay.id,
        status: userDay.status,
        name: userDay.name,
        checkIn: userDays.rows
          .filter((d) => d.id === userDay.id && d.event === 1)
          .sort()
          .slice(-1)[0].hour,
        checkOut: userDays.rows.filter((d) => d.id === userDay.id && d.event === 2).sort()[0].hour,
        absent: diff / 1000 / 60,
      })
    }
  })
  res.send({ data: response })
})

export const checkIn = asyncHandle(async (req, res) => {
  const userDay = await pool.query('SELECT id FROM user_days WHERE user_id = $1 AND date = $2', [
    req.user.id,
    new Date(),
  ])
  if (userDay.rowCount === 0) {
    const newUserDay = await pool.query(
      'INSERT INTO user_days (date,status,user_id) VALUES ($1,$2,$3) RETURNING id',
      [new Date(), 1, req.user.id]
    )
    await pool.query('INSERT INTO user_day_details (hour,event,day_id) VALUES ($1,$2,$3)', [
      `${new Date().getHours()}:${new Date().getMinutes()}`,
      1,
      newUserDay.rows[0].id,
    ])
  } else {
    const userDayDetails = await pool.query(
      'SELECT id,hour,event FROM user_day_details WHERE day_id=$1 ORDER BY hour ASC',
      [userDay.rows[0].id]
    )
    if (userDayDetails.rowCount >= 4)
      return res.status(403).send({ error: 'عملیات امکان پذیر نمی باشد.' })
    if (userDayDetails.rows[userDayDetails.rowCount - 1].event === 1)
      return res.status(403).send({ error: 'عملیات امکان پذیر نمی باشد.' })
    await pool.query('INSERT INTO user_day_details (hour,event,day_id) VALUES ($1,$2,$3)', [
      `${new Date().getHours()}:${new Date().getMinutes()}`,
      1,
      userDay.rows[0].id,
    ])
  }
  res.send({ data: 'Success' })
})

export const checkOut = asyncHandle(async (req, res) => {
  const userDay = await pool.query('SELECT id FROM user_days WHERE user_id = $1 AND date = $2', [
    req.user.id,
    new Date(),
  ])
  if (userDay.rowCount === 0) return res.status(403).send({ error: 'عملیات امکان پذیر نمی باشد.' })
  const userDayDetails = await pool.query(
    'SELECT id,hour,event FROM user_day_details WHERE day_id=$1 ORDER BY hour ASC',
    [userDay.rows[0].id]
  )
  if (userDayDetails.rowCount >= 4)
    return res.status(403).send({ error: 'عملیات امکان پذیر نمی باشد.' })
  if (userDayDetails.rows[userDayDetails.rowCount - 1].event === 2)
    return res.status(403).send({ error: 'عملیات امکان پذیر نمی باشد.' })
  await pool.query('INSERT INTO user_day_details (hour,event,day_id) VALUES ($1,$2,$3)', [
    `${new Date().getHours()}:${new Date().getMinutes()}`,
    2,
    userDay.rows[0].id,
  ])
  res.send({ data: 'Success' })
})
