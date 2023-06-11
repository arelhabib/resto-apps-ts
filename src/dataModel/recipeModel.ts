import { foodModel } from "./foodModel"
import { ingredientModel } from "./ingredientModel";

export interface recipeModel {
  foodId: number,
  ingredientId: number,
  food: foodModel,
  ingredient: ingredientModel,
}

export interface recipeDetailModel {
  name: string,
  image: string,
  price: number,
  ingredientsTotal: number,
  ingredients: ingredientModel[],
}

export interface recipeViewModel {
  foodId: number,
  food: string,
  ingredient: string[],
}

export interface recipeForm {
  foodId: number,
  ingredientId: number[],
}