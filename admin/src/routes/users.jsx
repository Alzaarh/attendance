import axios from 'axios'
import { Eye, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../components/button'

import { Skeleton } from '../components/shadcn/skeleton'
import { BASE_URL } from '../constants/config'

export function Users() {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${BASE_URL}/user`)
      .then((data) => {
        setUsers(data.data.data)
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-screen-lg mt-14">
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ) : (
        <div className="rounded-xl">
          <table className="w-full border-collapse border table-fixed">
            <thead>
              <tr>
                <th className="border border-slate-300 font-normal p-4 text-right">نام</th>
                <th className="border border-slate-300 font-normal p-4 text-right">نام کاربری</th>
                <th className="border border-slate-300 font-normal p-4 text-right w-36">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-slate-300 font-normal px-4">{user.name}</td>
                  <td className="border border-slate-300 font-normal px-4">{user.username}</td>
                  <td className="border border-slate-300 font-normal px-4">
                    <div className="flex gap-2">
                      <Button variant="icon">
                        <Eye />
                      </Button>
                      <Button variant="icon">
                        <Trash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
