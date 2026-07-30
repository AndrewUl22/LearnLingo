import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getFavoriteIds, addFavorite, removeFavorite } from "../services/favorites";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    if (!user) {
      setFavoriteIds([]);
      return;
    }

    getFavoriteIds(user.uid).then(setFavoriteIds);
  }, [user]);

  const isFavorite = (teacherId) => favoriteIds.includes(teacherId);

  const toggleFavorite = async (teacherId) => {
    if (!user) return;

    if (isFavorite(teacherId)) {
      setFavoriteIds((prev) => prev.filter((id) => id !== teacherId));
      await removeFavorite(user.uid, teacherId);
    } else {
      setFavoriteIds((prev) => [...prev, teacherId]);
      await addFavorite(user.uid, teacherId);
    }
  };

  const value = { favoriteIds, isFavorite, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
