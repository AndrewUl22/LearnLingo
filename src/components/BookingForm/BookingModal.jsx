import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import { bookingSchema } from "../../utils/validationSchemas";
import styles from "./BookingForm.module.css";

const REASONS = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const BookingModal = ({ isOpen, onClose, teacher }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(bookingSchema) });

  const selectedReason = watch("reason");

  const handleClose = () => {
    onClose();
    setTimeout(reset, 200);
  };

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Booking request sent! We will contact you soon.");
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="600px">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Book trial lesson</h2>
        <p className={styles.subtitle}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your needs.
        </p>

        <div className={styles.teacherRow}>
          <img className={styles.avatar} src={teacher.avatar_url} alt={teacher.name} />
          <div>
            <p className={styles.teacherLabel}>Your teacher</p>
            <p className={styles.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <p className={styles.reasonTitle}>What is your main reason for learning English?</p>
        <div className={styles.reasonList}>
          {REASONS.map((reason) => (
            <label
              key={reason}
              className={`${styles.reasonLabel} ${
                selectedReason === reason ? styles.reasonLabelActive : ""
              }`}
            >
              <input
                type="radio"
                value={reason}
                className={styles.reasonRadio}
                {...register("reason")}
              />
              {reason}
            </label>
          ))}
        </div>
        {errors.reason && <p className={styles.error}>{errors.reason.message}</p>}

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.field}>
            <input
              className={styles.input}
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
            />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Book"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;
