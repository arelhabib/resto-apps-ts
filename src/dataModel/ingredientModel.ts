export interface ingredientModel {
  id: number,
  name: string,
  price: number,
}

export interface ingredientForm {
  name: string | '',
  price: number | 0,
}