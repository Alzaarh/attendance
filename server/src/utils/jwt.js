import jwt from 'jsonwebtoken'

export function sign(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: 1000 * 60 * 60 },
      (error, token) => {
        if (error) reject(error)
        else resolve(token)
      }
    )
  })
}

export function decode(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, {}, (error, decoded) => {
      if (error) reject(error)
      else resolve(decoded)
    })
  })
}
