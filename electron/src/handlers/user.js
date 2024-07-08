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
    return {
      token: response.data.data.token,
      name: response.data.data.name,
      enter: response.data.data.enter,
      absent: response.data.data.absent,
      absentFull: response.data.data.absentFull,
    }
  } catch (error) {
    return { error: error.response.data.error }
  }
}

exports.enter = async (_event, token) => {
  try {
    await axios.post(
      `${BASE_URL}/system/check-in`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    return { error: error.response.data.error }
  }
}

exports.exit = async (_event, token) => {
  try {
    await axios.post(
      `${BASE_URL}/system/check-out`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    return { error: error.response.data.error }
  }
}

exports.startLeave = async (_event, token) => {
  try {
    await axios.post(
      `${BASE_URL}/system/start-leave`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    return { error: error.response.data.error }
  }
}

exports.endLeave = async (_event, token) => {
  try {
    await axios.post(
      `${BASE_URL}/system/end-leave`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    return { error: error.response.data.error }
  }
}
