import { useMemo, useState } from "react";
import { useTeachers } from "../../hooks/useTeachers";
import Filters from "../../components/Filters/Filters";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import styles from "./TeachersPage.module.css";

const INITIAL_FILTERS = { language: "", level: "", price: "" };

const TeachersPage = () => {
  const {
    teachers,
    isLoading,
    isLoadingMore,
    isError,
    hasMore,
    loadMore,
    languages,
    levels,
    prices,
  } = useTeachers();

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      if (filters.language && !teacher.languages.includes(filters.language)) {
        return false;
      }
      if (filters.level && !teacher.levels.includes(filters.level)) {
        return false;
      }
      if (filters.price && String(teacher.price_per_hour) !== filters.price) {
        return false;
      }
      return true;
    });
  }, [teachers, filters]);

  return (
    <main className={`container ${styles.page}`}>
      <h1 className="visually-hidden">Teachers catalog</h1>

      <Filters
        languages={languages}
        levels={levels}
        prices={prices}
        filters={filters}
        onChange={setFilters}
      />

      {isLoading && <p className={styles.state}>Loading teachers...</p>}

      {isError && (
        <p className={styles.state}>
          Something went wrong while loading teachers. Please try again.
        </p>
      )}

      {!isLoading && !isError && filteredTeachers.length === 0 && (
        <p className={styles.state}>No teachers match your filters.</p>
      )}

      {!isLoading && !isError && filteredTeachers.length > 0 && (
        <ul className={styles.list}>
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </ul>
      )}

      {!isLoading && !isError && hasMore && (
        <button
          type="button"
          className={styles.loadMoreButton}
          onClick={loadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? "Loading..." : "Load more"}
        </button>
      )}
    </main>
  );
};

export default TeachersPage;
