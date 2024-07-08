import { Label } from '../components/label'
import { Input } from '../components/input'
import { useState } from 'react'
import { Button } from '../components/button'
import axios from 'axios'
import { BASE_URL } from '../constants/config'
import toast from 'react-hot-toast'
import { RotateCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function UserForm({ userData, onSuccess }) {
  const [name, setName] = useState(userData?.name ?? '')
  const [username, setUsername] = useState(userData?.username ?? '')
  const [password, setPassword] = useState(userData?.password ?? '')
  const [startHour, setStartHour] = useState(userData?.startHour ?? '')
  const [endHour, setEndHour] = useState(userData?.endHour ?? '')
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!name) newErrors.name = 'نام را وارد کنید.'
    if (!username) newErrors.username = 'نام کاربری را وارد کنید.'
    if (!password) newErrors.password = 'رمز عبور را وارد کنید.'
    if (!startHour) newErrors.startHour = 'ساعت ورود را وارد کنید.'
    if (!endHour) newErrors.endHour = 'ساعت خروج را وارد کنید.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addUser = () => {
    if (!validateForm()) return
    setIsLoading(true)
    axios
      .post(
        `${BASE_URL}/user`,
        {
          username,
          name,
          password,
          startHour,
          endHour,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((data) => {
        console.log(data)
        toast.success('کاربر جدید با موفقیت ثبت شد.')
        onSuccess()
        navigate(0)
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
      })
      .finally(() => setIsLoading(false))
  }

  const updateUser = () => {
    if (!validateForm()) return
    setIsLoading(true)
    axios
      .put(
        `${BASE_URL}/user/${userData?.id}`,
        {
          username,
          name,
          password,
          startHour,
          endHour,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((data) => {
        console.log(data)
        toast.success('اطلاعات کاربر با موفقیت ویرایش شد.')
        onSuccess()
        navigate(0)
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="flex flex-col gap-3 pr-2">
      <div>
        <div className="flex items-center justify-between max-w-72">
          <Label id="name">نام:</Label>
          <Input
            id="name"
            type="text"
            className="basis-40"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          {errors.name && (
            <span className="text-red-500 text-xs mr-24">{errors.name}</span>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between max-w-72">
          <Label id="username">نام کاربری:</Label>
          <Input
            id="username"
            type="text"
            className="basis-40"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          {errors.username && (
            <span className="text-red-500 text-xs mr-24">
              {errors.username}
            </span>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between max-w-72">
          <Label id="password">رمز عبور:</Label>
          <Input
            id="password"
            type="text"
            className="basis-40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {errors.password && (
            <span className="text-red-500 text-xs mr-24">
              {errors.password}
            </span>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between max-w-72">
          <Label id="checkIn">ساعت ورود:</Label>
          <Input
            id="checkIn"
            type="text"
            className="basis-40"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
          />
        </div>
        <div>
          {errors.startHour && (
            <span className="text-red-500 text-xs mr-24">
              {errors.startHour}
            </span>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between max-w-72">
          <Label id="checkOut">ساعت خروج:</Label>
          <Input
            id="checkOut"
            type="text"
            className="basis-40"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
          />
        </div>
        <div>
          {errors.endHour && (
            <span className="text-red-500 text-xs mr-24">{errors.endHour}</span>
          )}
        </div>
      </div>
      <Button
        className="mt-3 flex justify-center"
        onClick={() => {
          if (!userData) addUser()
          else updateUser()
        }}
      >
        {isLoading ? <RotateCw className="animate-spin" /> : ' ثبت'}
      </Button>
    </div>
  )
}
