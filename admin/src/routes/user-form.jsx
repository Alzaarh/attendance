import { Label } from '../components/label'
import { Input } from '../components/input'
import { useState } from 'react'
import { Button } from '../components/button'
import axios from 'axios'
import { BASE_URL } from '../constants/config'
import toast from 'react-hot-toast'

export function UserForm({ userData }) {
  const [name, setName] = useState(userData?.name ?? '')
  const [username, setUsername] = useState(userData?.username ?? '')
  const [password, setPassword] = useState(userData?.password ?? '')
  const [startHour, setStartHour] = useState(userData?.startHour ?? '')
  const [endHour, setEndHour] = useState(userData?.endHour ?? '')

  function addUser() {
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
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
      })
      .finally()
  }
  function updateUser() {
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
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('اطلاعات کاربر با موفقیت ویرایش شد.')
      })
      .finally()
  }
 

  return (
    <div className="flex flex-col gap-3 pr-2">
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
      <Button
        className="mt-3"
        onClick={() => {
          if (!userData) addUser()
          else updateUser()
        }}
      >
        ثبت
      </Button>
    </div>
  )
}
