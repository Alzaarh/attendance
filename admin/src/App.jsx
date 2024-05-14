import { Login } from "./routes/login";
import { AuthContext } from "./auth-context";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {!isLoggedIn ? <Login /> : <div>Dashboard</div>}
    </AuthContext.Provider>
  );
}

export default App;
