import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  const [page, setPage] = useState("login");

  if (page === "login") {
    return (
      <Login
        onSwitchToRegister={() => setPage("register")}
      />
    );
  }

  return (
    <Register
      onSwitchToLogin={() => setPage("login")}
    />
  );
}