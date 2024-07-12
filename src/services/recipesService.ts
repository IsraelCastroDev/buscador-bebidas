import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
  RecipeAPIResponseSchema,
} from "../schemas/recipes-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios(url);

  const validateDataCategories = CategoriesAPIResponseSchema.safeParse(data);

  if (validateDataCategories.success) {
    return validateDataCategories.data;
  }
}

export async function getRecipes(filters: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;

  const { data } = await axios(url);

  const validateDataSearchFilter = DrinksAPIResponse.safeParse(data);

  if (validateDataSearchFilter.success) {
    return validateDataSearchFilter.data;
  }
}

export async function getRecipeById(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios(url);

  const validateDataRecipe = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
  console.log(validateDataRecipe);

  if (validateDataRecipe.success) {
    return validateDataRecipe.data;
  }
}
