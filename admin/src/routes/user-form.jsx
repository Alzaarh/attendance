import { Label } from "../components/label";
import { Input } from "../components/input";
import { useState } from "react";
import { Button } from "../components/button";

export function UserForm({ userData }) {
  const [name, setName] = useState(userData?.name ?? "");
  const [username, setUsername] = useState(userData?.username ?? "");
  const [password, setPassword] = useState(userData?.password ?? "");
  const [checkIn, setCheckIn] = useState(userData?.checkIn ?? "");
  const [checkOut, setCeckOut] = useState(userData?.checkOut ?? "");

  return (
    <div className="flex flex-col gap-3 pr-2">
      <div className="flex items-center justify-between max-w-72">
        <Label id="name">
          نام:
        </Label>
        <Input
          id="name"
          type="text"
          className="basis-40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between max-w-72">
        <Label id="username" >
          نام کاربری:
        </Label>
        <Input
          id="username"
          type="text"
          className="basis-40"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between max-w-72">
        <Label id="password">
          رمز عبور:
        </Label>
        <Input
          id="password"
          type="text"
          className="basis-40"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between max-w-72">
        <Label id="checkIn">
          ساعت ورود:
        </Label>
        <Input
          id="checkIn"
          type="text"
          className="basis-40"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between max-w-72">
        <Label id="checkOut">
          ساعت خروج:
        </Label>
        <Input
          id="checkOut"
          type="text"
          className="basis-40"
          value={checkOut}
          onChange={(e) => setCeckOut(e.target.value)}
        />
      </div>
      <Button className="mt-3">ثبت</Button>
    </div>
  );
}
