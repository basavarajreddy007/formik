import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import ShoppingPage from "./pages/ShoppingPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("currentUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  if (currentUser) {
    return <ShoppingPage user={currentUser} onLogout={handleLogout} />;
  }

  return <AuthPage onLoginSuccess={setCurrentUser} />;
}