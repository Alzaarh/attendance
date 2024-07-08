import { useEffect, useState } from 'react'
import { Skeleton } from '../components/shadcn/skeleton'
import axios from 'axios'
import { BASE_URL } from '../constants/config'
import { CalendarCheck2, CalendarClock, CalendarX2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/shadcn/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/shadcn/dialog'

import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import InputIcon from 'react-multi-date-picker/components/input_icon'
import { Button } from '../components/button'
import moment from 'moment-jalaali'
import { UpdateSystemForm } from './update-system-form'

// function convertToHourMinuteFormat(minutes) {
//   const hours = Math.floor(minutes / 60)
//   const mins = minutes % 60
//   const formattedTime = `${hours}:${mins.toString().padStart(2, '0')}:00`
//   return formattedTime
// }
export function System() {
  const [isLoading, setIsLoading] = useState(false)
  const [groupedUsers, setGroupedUsers] = useState([])
  const [date, setDate] = useState(
    moment().subtract(1, 'days').format('jYYYY/jMM/jDD')
  )

  function getUser() {
    setIsLoading(true)
    axios
      .get(`${BASE_URL}/system`, {
        params: {
          date: moment(date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((data) => {
        // setUsers(data.data.data)
        // console.log(users)
        const usersData = data.data.data
        const groupedUsersData = groupUsersById(usersData)
        setGroupedUsers(groupedUsersData)
      })
      .catch()
      .finally(() => setIsLoading(false))
  }
  function groupUsersById(usersData) {
    const grouped = {}
    usersData.forEach((user) => {
      if (!grouped[user.id]) {
        grouped[user.id] = {
          name: user.name,
          id: user.id,
          checkIn: null,
          checkOut: null,
          startDayOff: null,
          endDayOff: null,
          startLeave: null,
          endLeave: null,
        }
      }
      switch (user.status) {
        case 1:
          grouped[user.id].checkIn = user.start_hour
          grouped[user.id].checkOut = user.end_hour
          break
        case 2:
          grouped[user.id].startDayOff = user.start_hour
          grouped[user.id].endDayOff = user.end_hour
          break
        case 3:
          grouped[user.id].startLeave = user.start_hour
          grouped[user.id].endLeave = user.end_hour
          break
        default:
          break
      }
    })
    console.log(grouped)
    return Object.values(grouped)
  }

  useEffect(() => {
    getUser()
    // console.log(users);
  }, [])

  return (
    <div className="mx-auto max-w-screen-lg mt-14">
      <div className="flex gap-2 items-center mb-4">
        <p>انتخاب تاریخ: </p>
        <DatePicker
          value={date}
          onChange={(value) =>
            setDate(`${value.year}-${value.month}-${value.day}`)
          }
          calendar={persian}
          maxDate={moment().subtract(1, 'days').format('jYYYY/jMM/jDD')}
          locale={persian_fa}
          render={
            <InputIcon
              style={{
                height: '34px',
                width: '150px',
                borderRadius: '8px',
                fontSize: '16px',
                padding: '3px 10px',
              }}
            />
          }
          calendarPosition="bottom-right"
        />
        <Button variants={'ghost'} onClick={() => getUser()}>
          ثبت
        </Button>
      </div>
      <div className="rounded-xl">
        <table className="w-full border-collapse border table-fixed">
          <thead>
            <tr>
              <th className="border border-slate-300 font-normal p-4 text-right">
                نام کاربری
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-36">
                ساعت ورود
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-32">
                ساعت خروج
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-32">
                شروع مرخصی
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-32">
                پایان مرخصی
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-32">
                شروع غیبت
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-32">
                پایان غیبت
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-32">
                ثبت وضعیت
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <tr className="h-7">
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                </tr>
                <tr className="h-7">
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                </tr>
                <tr className="h-7">
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                </tr>
                <tr className="h-7">
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                </tr>
                <tr className="h-7">
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                </tr>
                <tr className="h-7">
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-20 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-14 px-4" />
                  </td>
                </tr>
              </>
            ) : (
              <>
                {groupedUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 font-normal px-4">
                      {user.name}
                    </td>
                    <td className="border border-slate-300 font-normal px-4">
                      {user.checkIn}
                    </td>
                    <td className="border border-slate-300 font-normal px-4">
                      {user.checkOut}
                    </td>
                    <td className="border border-slate-300 font-normal px-4">
                      {user.startDayOff}
                    </td>
                    <td className="border border-slate-300 font-normal px-4">
                      {user.endDayOff}
                    </td>
                    <td className="border border-slate-300 font-normal px-4">
                      {user.startLeave}
                    </td>
                    <td className="border border-slate-300 font-normal px-4">
                      {user.endLeave}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 items-center content-center">
                      <Dialog>
                        <DialogTrigger>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <button
                                  size="sm"
                                  className="rounded-full bg-success p-1 ml-2"
                                >
                                  <CalendarCheck2 className=" text-white size-4"></CalendarCheck2>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>حاضر</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>ثبت ساعات ورود-خروج</DialogTitle>
                          </DialogHeader>
                          <UpdateSystemForm user={user} status={1} />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <button
                                  size="sm"
                                  className="rounded-full bg-danger  p-1"
                                >
                                  <CalendarClock className=" text-white size-4"></CalendarClock>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>مرخصی</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>ثبت مرخصی</DialogTitle>
                          </DialogHeader>
                          <UpdateSystemForm user={user} status={2} />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <button
                                  size="sm"
                                  className="rounded-full bg-error p-1 mr-2"
                                >
                                  <CalendarX2 className=" text-white size-4"></CalendarX2>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>غیبت</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>ثبت غیبت</DialogTitle>
                          </DialogHeader>
                          <UpdateSystemForm user={user} status={3} />
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
