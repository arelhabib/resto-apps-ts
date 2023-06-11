import { foodModel } from "./foodModel"

export interface restaurantModel {
  id: number,
  name: string,
  food: foodModel[] | null,
}

export interface restaurantForm {
  name: string | '',
}