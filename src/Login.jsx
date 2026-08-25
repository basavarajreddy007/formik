import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login({ onSwitchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      rememberMe: Yup.boolean(),
    }),
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      console.log("Login submitted values:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("Login successful!");
    },
  });

  return (
    <div className="login-card">
      <h2>Login</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error-text">{formik.errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="error-text">{formik.errors.password}</p>
          )}
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={formik.values.rememberMe}
              {...formik.getFieldProps("rememberMe")}
            />
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn-submit"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        {formik.status && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              fontSize: "14px",
              color: formik.status.includes("successful") ? "#16a34a" : "#dc2626",
              fontWeight: "600",
            }}
          >
            {formik.status}
          </p>
        )}

        {onSwitchToRegister && (
          <p style={{ textAlign: "center", marginTop: "18px", fontSize: "14px", color: "#666" }}>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                fontWeight: "600",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              Register
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
