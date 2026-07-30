import { useEffect, useMemo, useState } from "react";
import { fetchTeachersPage } from "../services/teachers";

const PAGE_SIZE = 4;

export function useTeachers() {
  const [allTeachers, setAllTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchTeachersPage(PAGE_SIZE)
      .then(setAllTeachers)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const loadMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextCount = visibleCount + PAGE_SIZE;
      const nextTeachers = await fetchTeachersPage(nextCount);
      setAllTeachers(nextTeachers);
      setVisibleCount(nextCount);
    } catch {
      setIsError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMore = allTeachers.length >= visibleCount;

  const languages = useMemo(
    () => [...new Set(allTeachers.flatMap((teacher) => teacher.languages))].sort(),
    [allTeachers]
  );

  const levels = useMemo(
    () => [...new Set(allTeachers.flatMap((teacher) => teacher.levels))],
    [allTeachers]
  );

  const prices = useMemo(
    () => [...new Set(allTeachers.map((teacher) => teacher.price_per_hour))].sort(
      (a, b) => a - b
    ),
    [allTeachers]
  );

  return {
    teachers: allTeachers,
    isLoading,
    isLoadingMore,
    isError,
    hasMore,
    loadMore,
    languages,
    levels,
    prices,
  };
}
