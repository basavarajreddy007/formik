import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login({ onSwitchToRegister, onLoginSuccess }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus("");
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === values.email.trim().toLowerCase() &&
          u.password === values.password
      );

      if (user) {
        setStatus({ type: "success", text: `Welcome back, ${user.name || user.email}!` });
        localStorage.setItem("currentUser", JSON.stringify(user));
        setTimeout(() => onLoginSuccess?.(user), 600);
      } else {
        const userExists = users.some(
          (u) => u.email.toLowerCase() === values.email.trim().toLowerCase()
        );
        setStatus({
          type: "error",
          text: userExists
            ? "Incorrect password."
            : "Account not found. Please register first.",
        });
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          className="form-control"
          placeholder="name@example.com"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error-text">{formik.errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          className="form-control"
          placeholder="••••••••"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error-text">{formik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="btn-primary"
      >
        {formik.isSubmitting ? "Logging in..." : "Login"}
      </button>

      {formik.status && (
        <div className={`alert-msg alert-${formik.status.type}`}>
          {formik.status.text}
        </div>
      )}

      {onSwitchToRegister && (
        <p className="switch-text">
          Don't have an account?{" "}
          <button
            type="button"
            className="switch-link"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </p>
      )}
    </form>
  );
}
