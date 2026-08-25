import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register({ onSwitchToLogin }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
      setStatus("");
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.some(
        (u) => u.email.toLowerCase() === values.email.trim().toLowerCase()
      );

      if (userExists) {
        setStatus({
          type: "error",
          text: "An account with this email already exists!",
        });
        setSubmitting(false);
        return;
      }

      const newUser = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      resetForm();
      setStatus({
        type: "success",
        text: "Account created! Redirecting to login...",
      });

      setTimeout(() => {
        onSwitchToLogin?.();
      }, 1000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="reg-name">Full Name</label>
        <input
          id="reg-name"
          type="text"
          className="form-control"
          placeholder="John Doe"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="error-text">{formik.errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
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
        <label htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          type="password"
          className="form-control"
          placeholder="At least 6 characters"
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
        {formik.isSubmitting ? "Creating Account..." : "Create Account"}
      </button>

      {formik.status && (
        <div className={`alert-msg alert-${formik.status.type}`}>
          {formik.status.text}
        </div>
      )}

      {onSwitchToLogin && (
        <p className="switch-text">
          Already have an account?{" "}
          <button
            type="button"
            className="switch-link"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </p>
      )}
    </form>
  );
}
