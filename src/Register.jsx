import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register({ onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      console.log("Registration submitted values:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("Registration successful! You can now log in.");
    },
  });

  return (
    <div className="login-card">
      <h2>Register</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error-text">{formik.errors.name}</p>
          )}
        </div>

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
              placeholder="Create a password"
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Confirm your password"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="error-text">{formik.errors.confirmPassword}</p>
          )}
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={formik.values.terms}
              {...formik.getFieldProps("terms")}
            />
            I agree to the Terms & Conditions
          </label>
        </div>
        {formik.touched.terms && formik.errors.terms && (
          <p className="error-text" style={{ marginTop: "-14px", marginBottom: "14px" }}>
            {formik.errors.terms}
          </p>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn-submit"
        >
          {formik.isSubmitting ? "Creating Account..." : "Register"}
        </button>

        {formik.status && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              fontSize: "14px",
              color: "#16a34a",
              fontWeight: "600",
            }}
          >
            {formik.status}
          </p>
        )}

        {onSwitchToLogin && (
          <p style={{ textAlign: "center", marginTop: "18px", fontSize: "14px", color: "#666" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
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
              Login
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
