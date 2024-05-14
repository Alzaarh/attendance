import { useContext, useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { AuthContext } from "../auth-context";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) setUsernameError(true);
    else setUsernameError(false);
    if (!password) setPasswordError(true);
    else setPasswordError(false);
    if (username === "admin" && password === "12345") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <Label id="username" error={usernameError}>
            نام کاربری
          </Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <Label id="password" error={passwordError}>
            رمز عبور
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">ورود</Button>
      </form>
    </div>
  );
};
