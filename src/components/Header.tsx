import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const showNotification = useAppStore((state) => state.showNotification);

  const location = useLocation();
  const isHome = useMemo(() => location.pathname === "/", [location.pathname]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const fieldIsEmpty = useMemo(
    () => Object.values(searchFilters).includes(""),
    [searchFilters]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validacion
    if (fieldIsEmpty) {
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // si pasa la validacion, se hace la consulta a la API
    searchRecipes(searchFilters);
  };

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-10">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/">
              <img src="/logo.svg" alt="logo bebidas react" className="w-32" />
            </Link>
          </div>

          <nav className="text-white text-xl uppercase font-bold flex gap-4 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "bg-orange-500 p-1" : "p-1"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive ? "bg-orange-500 p-1" : "p-1"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 2xl:w-1/3 bg-orange-500 my-16 p-10 rounded-lg shadow space-y-6"
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingredientes
              </label>

              <input
                onChange={handleChange}
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, etc"
                value={searchFilters.ingredient}
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>

              <select
                onChange={handleChange}
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                value={searchFilters.category}
              >
                <option value="">--Seleccione--</option>
                {categories.drinks.map((currentCategory) => (
                  <option
                    key={currentCategory.strCategory}
                    value={currentCategory.strCategory}
                  >
                    {currentCategory.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              className="bg-red-900 text-white uppercase text-center font-bold w-full p-2 cursor-pointer rounded-lg"
              value="buscar receta"
            />
          </form>
        )}
      </div>
    </header>
  );
}
export default Header;
