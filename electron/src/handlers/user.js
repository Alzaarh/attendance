const moment = require('moment-jalaali')
const axios = require('axios')

const { query } = require('../helpers/database')

const BASE_URL = 'http://localhost:3000/api'

exports.login = async (_event, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/user/login`, {
      username: data.username,
      password: data.password,
    })
    return { token: response.data.data.token, name: response.data.data.name }
  } catch (error) {
    return { error: error.response.data.error }
  }
  // try {
  //   const res = await query('SELECT * FROM users WHERE username = $1 AND password = $2', [
  //     data.username,
  //     data.password,
  //   ])
  //   if (res.rows.length > 0) {
  //     const recentActivity = await query(
  //       'SELECT * FROM users_data WHERE user_id = $1 ORDER BY created_at DESC LIMIT 4',
  //       [res.rows[0].id]
  //     )
  //     let count = 0
  //     recentActivity.rows.forEach((activity) => {
  //       if (moment(activity.created_at).jDayOfYear() === moment().jDayOfYear()) count++
  //     })
  //     if (count === 4) return { success: false }
  //     return {
  //       success: true,
  //       user: res.rows[0],
  //       event: (recentActivity.rows[0]?.event === 1 ? 2 : 1) ?? 1,
  //     }
  //   }
  //   return { success: false }
  // } catch (e) {
  //   console.error(e)
  //   return { error: 'خطای سرور' }
  // }
}

exports.enter = async (_event, userId) => {
  try {
    await query('INSERT INTO users_data (event, user_id, created_at) VALUES ($1, $2, $3)', [
      1,
      userId,
      new Date().toLocaleString(),
    ])
    return { success: true }
  } catch (e) {
    console.error(e)
  }
}

exports.exit = async (_event, userId) => {
  try {
    await query('INSERT INTO users_data (event, created_at, user_id) VALUES ($1, $2, $3)', [
      2,
      new Date().toLocaleString(),
      userId,
    ])
    return { success: true }
  } catch (e) {
    console.error(e)
  }
}
