import { useEffect, useState } from 'react'
import { Skeleton } from '../components/shadcn/skeleton'
import { Button } from '../components/button'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/input'
import { Label } from '../components/label'
import DatePicker from 'react-multi-date-picker'
import InputIcon from 'react-multi-date-picker/components/input_icon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/shadcn/tooltip'

export function Report() {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {}, [])

  return (
    <div className="mx-auto max-w-screen-lg mt-14">
      {isLoading ? (
        <div className="flex flex-col space-y-3 gap-10 mt-5 mr-10">
          <div className="flex justify-start gap-8">
            <Skeleton className="h-9 w-36 rounded-xl" />
            <Skeleton className="h-9 w-36 rounded-xl" />
            <Skeleton className="h-9 w-20 rounded-xl" />
          </div>
          <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75  dark:bg-white/10" />
          <div className="flex justify-start gap-8">
            <Skeleton className="h-9 w-36 rounded-xl" />
            <Skeleton className="h-9 w-20 rounded-xl" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div>
            <div>
              <h1>گزارش ماهیانه هر کاربر:</h1>
            </div>
            <div className="flex gap-8 m-5">
              <div className="flex gap-2 items-center">
                <p>انتخاب ماه: </p>
                <DatePicker
                  onlyMonthPicker
                  format="MMMM YYYY"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
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
                />
              </div>
              <div className="flex items-center gap-2 max-w-80">
                <Label>نام کاربر :</Label>
                <Input type="text" className="basis-24 h-9 w-40" />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button>دریافت</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>دریافت گزارش ماهانه کاربر</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75  dark:bg-white/10" />
          <div>
            <div>
              <h1>گزارش ماهیانه شرکت:</h1>
            </div>
            <div className="flex gap-8 m-5">
              <div className="flex gap-2 items-center">
                <p>انتخاب ماه: </p>
                <DatePicker
                  onlyMonthPicker
                  format="MMMM YYYY"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
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
                />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button>دریافت</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>دریافت گزارش ماهانه شرکت</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
