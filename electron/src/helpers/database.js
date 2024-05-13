const { Client } = require('pg')

const databaseConfig = {
  user: 'postgres',
  password: '12345',
  host: '127.0.0.1',
  database: 'employee',
  port: 5432,
}

exports.createDatabase = async () => {
  const client = new Client(databaseConfig)
  await client.connect()
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid(),
      username VARCHAR NOT NULL UNIQUE,
      password VARCHAR NOT NULL,
      name VARCHAR NOT NULL,
      PRIMARY KEY (id)
    )`)
  await client.query(`
    CREATE TABLE IF NOT EXISTS users_data (
      id UUID DEFAULT gen_random_uuid(),
      event INT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      PRIMARY KEY (id)
    )`)
  await client.end()
}

exports.query = async (query, params) => {
  const client = new Client(databaseConfig)
  await client.connect()
  const res = await client.query(query, params)
  await client.end()
  return res
}
