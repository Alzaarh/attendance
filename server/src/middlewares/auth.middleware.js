import { decode } from '../utils/jwt.js'

export async function protectUser(req, res, next) {
  try {
    const token = req.headers.authorization
    const [_, jwt] = token.split('Bearer ')
    const payload = await decode(jwt)
    req.user = payload.user
    next()
  } catch (error) {
    res.status(401).send({ error: 'ابتدا لاگین کنید.' })
  }
}

export async function protectAdmin(req, res, next) {
  try {
    const token = req.headers.authorization
    const [_, jwt] = token.split('Bearer ')
    const payload = await decode(jwt)
    if (payload.admin !== true)
      res.status(401).send({ error: 'ابتدا لاگین کنید.' })
    next()
  } catch (error) {
    res.status(401).send({ error: 'ابتدا لاگین کنید.' })
  }
}
