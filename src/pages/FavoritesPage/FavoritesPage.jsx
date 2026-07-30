import { useEffect, useState } from "react";
import { fetchAllTeachers } from "../../services/teachers";
import { useFavorites } from "../../context/FavoritesContext";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import styles from "../TeachersPage/TeachersPage.module.css";

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const [allTeachers, setAllTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchAllTeachers()
      .then(setAllTeachers)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const favoriteTeachers = allTeachers.filter((teacher) =>
    favoriteIds.includes(teacher.id)
  );

  return (
    <main className={`container ${styles.page}`}>
      <h1 className="visually-hidden">Favorite teachers</h1>

      {isLoading && <p className={styles.state}>Loading favorites...</p>}

      {isError && (
        <p className={styles.state}>
          Something went wrong while loading your favorites. Please try again.
        </p>
      )}

      {!isLoading && !isError && favoriteTeachers.length === 0 && (
        <p className={styles.state}>
          You haven&apos;t added any teachers to favorites yet.
        </p>
      )}

      {!isLoading && !isError && favoriteTeachers.length > 0 && (
        <ul className={styles.list}>
          {favoriteTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default FavoritesPage;
