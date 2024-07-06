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
          userDays.rows
            .filter((d) => d.id === userDay.id && d.event === 2)
            .sort()[0].hour,
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
        checkOut: userDays.rows
          .filter((d) => d.id === userDay.id && d.event === 2)
          .sort()[0].hour,
        absent: diff / 1000 / 60,
      })
    }
  })
  res.send({ data: response })
})

export const checkIn = asyncHandle(async (req, res) => {
  const userDay = await pool.query(
    `
      INSERT INTO user_days 
      (date, user_id) 
      VALUES ($1, $2) 
      RETURNING id
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
