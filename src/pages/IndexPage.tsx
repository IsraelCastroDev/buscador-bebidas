import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";

function IndexPage() {
  const drinks = useAppStore((state) => state.drinks);

  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks]);

  return (
    <>
      <h1 className="text-4xl font-extrabold">Recetas</h1>

      {hasDrinks ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6">
          {drinks.drinks.map((currentDrink) => (
            <DrinkCard key={currentDrink.idDrink} drink={currentDrink} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          No hay resultados aún, utiliza el formulario para buscar recetas.
        </p>
      )}
    </>
  );
}
export default IndexPage;
