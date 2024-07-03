import { createContext } from 'react'

// eslint-disable-next-line no-unused-vars
export const AuthContext = createContext({ isLoggedIn: false, setIsLoggedIn: (_val) => {} })
