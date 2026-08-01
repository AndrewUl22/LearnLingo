import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validationSchemas";
import PasswordInput from "../PasswordInput/PasswordInput";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Welcome back!");
      onSuccess();
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.subtitle}>
        Welcome back! Please enter your credentials to access your account
        and continue your search for a teacher.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <PasswordInput placeholder="Password" {...register("password")} />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className={styles.switchText}>
        Don&apos;t have an account?{" "}
        <button type="button" className={styles.switchButton} onClick={onSwitchToRegister}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
