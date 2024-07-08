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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/shadcn/alert-dialog'
import { Eye, RotateCw, Trash } from 'lucide-react'
import { UserForm } from './user-form'
import { Button } from '../components/button'
import axios from 'axios'
import { BASE_URL } from '../constants/config'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function User({ user }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  function deleteUser() {
    setIsLoading(true)
    axios
      .delete(`${BASE_URL}/user/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((data) => {
        console.log(data)
        toast.success('کاربر با موفقیت حذف شد.')
        setIsOpen(false)
        navigate(0)
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
      })
      .finally(() => setIsLoading(false))
  }
  return (
    <tr>
      <td className="border border-slate-300 font-normal px-4">{user.name}</td>
      <td className="border border-slate-300 font-normal px-4">
        {user.username}
      </td>
      <td className="border border-slate-300 font-normal py-2">
        <div className="flex justify-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="icon"
                      className="bg-white text-black hover:bg-black/5"
                    >
                      <Eye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>مشاهده جزئیات کاربر</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>جزئیات کاربر </DialogTitle>
              </DialogHeader>
              <UserForm
                userData={user}
                onSuccess={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="icon"
                      className="bg-white text-black hover:bg-black/5"
                    >
                      <Trash />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>حذف کاربر</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  آیا از حذف این کاربر مطمئن هستید؟
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>خیر</AlertDialogCancel>
                <Button
                  className="mt-2 bg-primary m-2 rounded-lg px-4 py-1 text-white  sm:mt-0"
                  onClick={() => deleteUser()}
                >
                  {isLoading ? <RotateCw className="animate-spin" /> : 'بله'}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  )
}
