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
            Unlock your potential with the best{" "}
            <em className={styles.highlight}>language</em> tutors
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
          <div className={styles.imagePanel}>
            <img
              className={styles.heroImage}
              src="/images/hero-character.png"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className={`container ${styles.statsSection}`}>
        <ul className={styles.statsList}>
          {BENEFITS.map((benefit) => (
            <li key={benefit.label} className={styles.statItem}>
              <p className={styles.statValue}>{benefit.value}+</p>
              <p className={styles.statLabel}>{benefit.label}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
