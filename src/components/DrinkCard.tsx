import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

type Props = {
  drink: Drink;
};

function DrinkCard({ drink }: Props) {
  const selectRecipe = useAppStore((state) => state.selectRecipe);

  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className="hover:scale-105 hover:rotate-2 transition-transform duration-300 ease-in-out"
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          onClick={() => selectRecipe(drink.idDrink)}
          type="button"
          className="bg-orange-500 hover:bg-orange-600 mt-5 w-full p-3 font-bold text-white text-lg"
        >
          Ver receta
        </button>
      </div>
    </div>
  );
}
export default DrinkCard;
