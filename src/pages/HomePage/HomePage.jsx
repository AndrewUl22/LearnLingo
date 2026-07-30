import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const BENEFITS = [
  { value: "32,000", label: "Experienced tutors" },
  { value: "300,000", label: "5-star tutor reviews" },
  { value: "120", label: "Subjects taught" },
  { value: "200", label: "Tutor nationalities" },
];

const HomePage = () => {
  return (
    <main className={styles.page}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Unlock your potential with the best <span>language</span> tutors
          </h1>
          <p className={styles.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate Your Language Proficiency to New Heights by Connecting with
            Highly Qualified and Experienced Tutors.
          </p>
          <Link to="/teachers" className={styles.ctaButton}>
            Get started
          </Link>
        </div>

        <div className={styles.imageWrapper}>
          <div className={styles.imageCircle} />
        </div>
      </section>

      <section className={`container ${styles.benefits}`}>
        <ul className={styles.benefitsList}>
          {BENEFITS.map((benefit) => (
            <li key={benefit.label} className={styles.benefitCard}>
              <p className={styles.benefitValue}>{benefit.value}</p>
              <p className={styles.benefitLabel}>{benefit.label}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
