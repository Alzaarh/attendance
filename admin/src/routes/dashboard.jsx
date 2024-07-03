import { LogOut } from "lucide-react";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../components/button";

import { AuthContext } from "../stores/auth-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/shadcn/tooltip";

export function Dashboard() {
  const { setIsLoggedIn } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/dashboard/user">کاربران</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/system">حضور و غیاب</NavLink>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="icon"
                    className="bg-white text-black hover:bg-black/5"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>خروج</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
