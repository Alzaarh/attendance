import { useEffect, useState } from "react";
import { Skeleton } from "../components/shadcn/skeleton";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import { CalendarCheck2, CalendarClock, CalendarX2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/shadcn/tooltip";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { Button } from "../components/button";
import moment from "moment-jalaali";

export function System() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(
    moment().subtract(1, "days").format("jYYYY/jMM/jDD")
  );

  function convertToHourMinuteFormat(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedTime = `${hours}:${mins.toString().padStart(2, "0")}:00`;
    return formattedTime;
  }

  function getUser() {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/system`, {
        params: {
          date: moment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD"),
        },
      })
      .then((data) => {
        setUsers(data.data.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/system`)
      .then((data) => {
        setUsers(data.data.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

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
          maxDate={moment().subtract(1, "days").format("jYYYY/jMM/jDD")}
          locale={persian_fa}
          render={
            <InputIcon
              style={{
                height: "34px",
                width: "150px",
                borderRadius: "8px",
                fontSize: "16px",
                padding: "3px 10px",
              }}
            />
          }
          calendarPosition="bottom-right"
        />
        <Button variants={"ghost"} onClick={() => getUser()}>
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
              <th className="border border-slate-300 font-normal p-4 text-right w-36">
                ساعت خروج
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-36">
                زمان غیبت
              </th>
              <th className="border border-slate-300 font-normal p-4 text-right w-36">
                وضعیت
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
                    <Skeleton className="h-3 w-52 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
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
                    <Skeleton className="h-3 w-52 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
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
                    <Skeleton className="h-3 w-52 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
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
                    <Skeleton className="h-3 w-52 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
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
                    <Skeleton className="h-3 w-52 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
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
                    <Skeleton className="h-3 w-52 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
                  </td>
                  <td className="border border-slate-300 font-normal px-4">
                    <Skeleton className="h-3 w-24 px-4" />
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
                {users.map((user) => (
                  <tr key={user.id}>
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
                      {convertToHourMinuteFormat(user.absent)}
                    </td>
                    <td className="border border-slate-300 font-normal px-4">
                      {user.status === 2
                        ? "مرخصی"
                        : user.status === 3
                        ? "غیبت"
                        : "حاضر"}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 items-center content-center">
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
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
