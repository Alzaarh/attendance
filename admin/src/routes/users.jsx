import axios from "axios";
import { Eye, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/button";

import { Skeleton } from "../components/shadcn/skeleton";
import { BASE_URL } from "../constants/config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/shadcn/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/shadcn/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/shadcn/dialog";

export function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/user`)
      .then((data) => {
        setUsers(data.data.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

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
                <th className="border border-slate-300 font-normal p-4 text-right">
                  نام
                </th>
                <th className="border border-slate-300 font-normal p-4 text-right">
                  نام کاربری
                </th>
                <th className="border border-slate-300 font-normal p-4 text-right w-36">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-slate-300 font-normal px-4">
                    {user.name}
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    {user.username}
                  </td>
                  <td className="border border-slate-300 font-normal px-4 py-2">
                    <div className="flex gap-2">
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
                          <div className="flex flex-col gap-2 pr-2">
                            <div>نام: {user.name}</div>
                            <div>نام کاربری: {user.username}</div>
                            <div>رمز عبور: {user.password}</div>
                            <div>ساعت ورود: {user.checkIn}</div>
                            <div>ساعت خروج: {user.checkOut}</div>
                          </div>
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
                            <AlertDialogAction>بله</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
