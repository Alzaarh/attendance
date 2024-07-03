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
    PRIMARY KEY (id)
    )`
  )
  .then(() =>
    pool.query(`
        CREATE TABLE IF NOT EXISTS users_data (
        id UUID DEFAULT gen_random_uuid(),
        event INT NOT NULL,
        created_at TIMESTAMP NOT NULL,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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
