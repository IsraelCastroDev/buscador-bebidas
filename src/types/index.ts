import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
  DrinkAPIResponse,
  SearchFilterSchema,
  RecipeAPIResponseSchema,
} from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drink = z.infer<typeof DrinkAPIResponse>;
export type Drinks = z.infer<typeof DrinksAPIResponse>;
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;
