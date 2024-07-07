import { createServer } from 'node:http'

import { CronJob } from 'cron'
import moment from 'moment'

import app from './app.js'
import { pool } from './utils/db.js'

pool
  .query(
    `
    CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid(),
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    startHour TIME NOT NULL DEFAULT '8:00',
    endHour TIME NOT NULL DEFAULT '16:00',
    PRIMARY KEY (id)
    )`
  )
  .then(() =>
    pool.query(`
        CREATE TABLE IF NOT EXISTS user_days (
        id UUID DEFAULT gen_random_uuid(),
        date DATE NOT NULL,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
        )`)
  )
  .then(() =>
    pool.query(`
        CREATE TABLE IF NOT EXISTS user_day_details (
        id UUID DEFAULT gen_random_uuid(),
        start_hour TIME NOT NULL,
        end_hour TIME,
        status INT NOT NULL,
        day_id UUID NOT NULL REFERENCES user_days(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
        )`)
  )
  .then(() => {
    new CronJob(
      '* * * * *',
      async () => {
        const users = await pool.query('SELECT id FROM users')
        for await (const user of users.rows) {
          await pool.query(
            'INSERT INTO user_days (date, user_id) VALUES ($1, $2)',
            [new Date(), user.id]
          )
        }
        const userDays = await pool.query(
          'SELECT user_days.id, starthour, endhour FROM user_days INNER JOIN users ON users.id = user_days.user_id WHERE date = $1',
          [moment().subtract(1, 'day').toDate()]
        )
        for await (const userDay of userDays.rows) {
          const userDayDetails = await pool.query(
            'SELECT FROM user_day_details WHERE day_id = $1',
            [userDay.id]
          )
          if (userDayDetails.rowCount === 0)
            await pool.query(
              'INSERT INTO user_day_details (start_hour, end_hour, status, day_id) VALUEs ($1, $2, $3, $4)',
              [userDay.starthour, userDay.endhour, 3, userDay.id]
            )
        }
      },
      null,
      true
    )
    createServer(app).listen(3000, () =>
      console.log('Attendance is running on port 3000')
    )
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
