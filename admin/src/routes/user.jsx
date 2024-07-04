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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/shadcn/alert-dialog'
import { Eye, Trash } from 'lucide-react'
import { UserForm } from './user-form'
import { Button } from '../components/button'
import axios from 'axios'
import { BASE_URL } from '../constants/config'
import toast from 'react-hot-toast'

export function User({ user }) {
  function deleteUser() {
    axios
      .delete(`${BASE_URL}/user/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((data) => {
        console.log(data)
        toast.success('کاربر با موفقیت حذف شد.')
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
      })
      .finally()
  }
  return (
    <tr>
      <td className="border border-slate-300 font-normal px-4">{user.name}</td>
      <td className="border border-slate-300 font-normal px-4">
        {user.username}
      </td>
      <td className="border border-slate-300 font-normal py-2">
        <div className="flex justify-center">
          <Dialog>
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
              <UserForm userData={user} />
            </DialogContent>
          </Dialog>
          <AlertDialog>
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
                <AlertDialogAction onClick={() => deleteUser()}>
                  بله
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  )
}
