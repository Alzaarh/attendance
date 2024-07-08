import { useState } from 'react'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Label } from '../components/label'
import { useNavigate } from 'react-router-dom'
import { RotateCw } from 'lucide-react'
import { BASE_URL } from '../constants/config'
import axios from 'axios'
import toast from 'react-hot-toast'

export function UpdateSystemForm({ user, status }) {
  const [isLoading, setIsLoading] = useState(false)
  const [start, setStart] = useState(
    status === 1
      ? user.checkIn
      : status === 2
      ? user.startDayOff
      : status === 3
      ? user.startLeave
      : ''
  )
  const [end, setEnd] = useState(
    status === 1
      ? user.checkOut
      : status === 2
      ? user.endDayOff
      : status === 3
      ? user.endLeave
      : ''
  )
  const updateCheckIn = (start, end, id) => {
    setIsLoading(true)
    axios
      .put(
        `${BASE_URL}/system/${id}/check-in`,
        {
          startHour: start,
          endHour: end,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        toast.success('ساعت حضور کاربر با موفقیت ویرایش شد.')
        navigate(0)
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
      })
      .finally(() => setIsLoading(false))
  }
  const updateDayOff = (start, end, id) => {
    setIsLoading(true)
    axios
      .put(
        `${BASE_URL}/system/${id}/absent`,
        {
          startHour: start,
          endHour: end,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        toast.success('ساعت مرخصی کاربر با موفقیت ویرایش شد.')
        navigate(0)
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
      })
      .finally(() => setIsLoading(false))
  }
  const updateLeave = (start, end, id) => {
    setIsLoading(true)
    axios
      .put(
        `${BASE_URL}/system/${id}/leave`,
        {
          startHour: start,
          endHour: end,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        toast.success('ساعت غیبت کاربر با موفقیت ویرایش شد.')
        navigate(0)
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
      })
      .finally(() => setIsLoading(false))
  }

  const navigate = useNavigate()
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between max-w-80">
          <Label id="username">
            {status === 1
              ? 'ساعت ورود:'
              : status === 2
              ? 'ساعت شروع مرخصی:'
              : 'ساعت شروع غیبت:'}
          </Label>
          <Input
            id="username"
            type="text"
            className="basis-24"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between max-w-80">
          <Label id="username">
            {status === 1
              ? 'ساعت خروج:'
              : status === 2
              ? 'ساعت پایان مرخصی:'
              : 'ساعت پایان غیبت:'}
          </Label>
          <Input
            id="username"
            type="text"
            className="basis-24"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>
      <Button
        className="mt-3 flex justify-center w-full"
        onClick={() =>
          status === 1
            ? updateCheckIn(start, end, user.id)
            : status === 2
            ? updateDayOff(start, end, user.id)
            : updateLeave(start, end, user.id)
        }
      >
        {isLoading ? <RotateCw className="animate-spin" /> : ' ثبت'}
      </Button>
    </div>
  )
}
