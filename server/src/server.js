import { createServer } from 'node:http'

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
        status INT NOT NULL, 
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
        )`)
  )
  .then(() =>
    pool.query(`
        CREATE TABLE IF NOT EXISTS user_day_details (
        id UUID DEFAULT gen_random_uuid(),
        hour TIME NOT NULL,
        event INT NOT NULL,
        day_id UUID NOT NULL REFERENCES user_days(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
        )`)
  )
  .then(() =>
    createServer(app).listen(3000, () => console.log('Attendance is running on port 3000'))
  )
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
