import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites);
  const hasFavorites = useMemo(() => favorites.length, [favorites]);

  return (
    <>
      <h1 className="text-5xl font-extrabold">Favoritos</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6">
          {favorites.map((currentFavorite) => (
            <DrinkCard key={currentFavorite.idDrink} drink={currentFavorite} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-lg">
          Los favoritos se mostrarán aquí.
        </p>
      )}
    </>
  );
}
export default FavoritesPage;
