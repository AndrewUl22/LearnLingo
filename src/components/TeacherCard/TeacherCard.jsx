import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import BookingModal from "../BookingForm/BookingModal";
import styles from "./TeacherCard.module.css";

const TeacherCard = ({ teacher }) => {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const favorite = isFavorite(teacher.id);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to add teachers to favorites");
      return;
    }
    toggleFavorite(teacher.id);
  };

  return (
    <li className={styles.card}>
      <img className={styles.avatar} src={teacher.avatar_url} alt={`${teacher.name} ${teacher.surname}`} />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.eyebrow}>Languages</span>

          <div className={styles.statsRow}>
            <span className={styles.stat}>
              <ClockIcon />
              Lessons online
            </span>
            <span className={styles.stat}>
              <StarIcon />
              Rating: {teacher.rating}
            </span>
            <span className={styles.stat}>
              Price / 1 hour:{" "}
              <strong className={styles.price}>{teacher.price_per_hour}$</strong>
            </span>
          </div>

          <button
            type="button"
            className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ""}`}
            onClick={handleFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartIcon filled={favorite} />
          </button>
        </div>

        <h3 className={styles.name}>
          {teacher.name} {teacher.surname}
        </h3>

        <ul className={styles.metaList}>
          <li>
            <span className={styles.metaLabel}>Speaks:</span>{" "}
            <span className={styles.languagesValue}>
              {teacher.languages.join(", ")}
            </span>
          </li>
          <li>
            <span className={styles.metaLabel}>Lesson Info:</span> {teacher.lesson_info}
          </li>
          <li>
            <span className={styles.metaLabel}>Conditions:</span> {teacher.conditions.join(" ")}
          </li>
        </ul>

        {isExpanded && (
          <div className={styles.expanded}>
            <p className={styles.experience}>{teacher.experience}</p>

            <ul className={styles.reviewList}>
              {teacher.reviews.map((review, index) => (
                <li key={index} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAvatar}>
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className={styles.reviewerName}>{review.reviewer_name}</p>
                      <span className={styles.reviewRating}>
                        <StarIcon /> {review.reviewer_rating}.0
                      </span>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          className={styles.readMoreButton}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>

        <div className={styles.levelRow}>
          {teacher.levels.map((level) => (
            <span key={level} className={styles.levelBadge}>
              #{level}
            </span>
          ))}
        </div>

        <button
          type="button"
          className={styles.bookButton}
          onClick={() => setIsBookingOpen(true)}
        >
          Book trial lesson
        </button>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        teacher={teacher}
      />
    </li>
  );
};

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M8 4.8V8l2.2 1.3"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 1.5l1.85 3.9 4.15.55-3.05 3 0.75 4.35L8 11.2l-3.7 2.1.75-4.35-3.05-3 4.15-.55L8 1.5z"
      fill="#f4c550"
    />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <path
      d="M13 22.5s-8.5-5.2-11-10.2C0.3 8.9 2 5 5.7 4.1c2.4-0.6 4.8 0.4 6.3 2.5 1.5-2.1 3.9-3.1 6.3-2.5C22 5 23.7 8.9 22 12.3c-2.5 5-11 10.2-11 10.2z"
      fill={filled ? "#f4c550" : "none"}
      stroke={filled ? "#f4c550" : "currentColor"}
      strokeWidth="1.6"
    />
  </svg>
);

export default TeacherCard;
