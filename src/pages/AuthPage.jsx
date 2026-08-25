import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export default function AuthPage({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-card">
      <div className="auth-tabs">
        <button
          type="button"
          className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      {activeTab === "login" ? (
        <Login
          onSwitchToRegister={() => setActiveTab("register")}
          onLoginSuccess={onLoginSuccess}
        />
      ) : (
        <Register onSwitchToLogin={() => setActiveTab("login")} />
      )}
    </div>
  );
}
