import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { registerSchema } from "../../utils/validationSchemas";
import PasswordInput from "../PasswordInput/PasswordInput";
import styles from "../LoginForm/LoginForm.module.css";

const RegisterForm = ({ onSuccess, onSwitchToLogin }) => {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Account created successfully!");
      onSuccess();
    } catch (error) {
      console.error("Registration error:", error.code, error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else {
        toast.error(`Error: ${error.code || error.message}`);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.subtitle}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following
        information.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

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
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className={styles.switchText}>
        Already have an account?{" "}
        <button type="button" className={styles.switchButton} onClick={onSwitchToLogin}>
          Log In
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
