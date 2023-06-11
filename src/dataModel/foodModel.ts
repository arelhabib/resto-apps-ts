import { restaurantModel } from "./restaurantModel";

export interface foodModel {
  id: number,
  name: string,
  price: number,
  image: string,
  restaurant: restaurantModel | null,

}

export interface foodForm {
  name: string | '',
  price: number | 0,
  image: string | '',
  restaurantId: number | 0,
}