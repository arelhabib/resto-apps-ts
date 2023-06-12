import axios from "axios";
import API_URL from "../config/config";
import { recipeForm } from "../dataModel/recipeModel";

const URL = API_URL + '/foods-ingredients'

const getRecipe = async <T>(cb: (result: T) => void) => {
  const result = await axios.get(URL)
  cb(result.data)
}

const postRecipe = async (data: recipeForm, cb: (result: boolean) => void) => {
  await axios.post(`${URL}/create`, data)
  cb(true)
}

const deleteRecipe = async <T>(id: number, cb: (result: T) => void) => {
  const result = await axios.get(`${URL}/delete/${id}`)
  cb(result.data)
}

const detailRecipe = async <T>(id: number, cb: (result: T) => void) => {
  const result = await axios.get(`${URL}/${id}/ingredients`)
  cb(result.data)
}

export { getRecipe, postRecipe, deleteRecipe, detailRecipe }


