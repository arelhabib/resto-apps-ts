import axios from "axios";
import API_URL from "../config/config";
import { foodForm } from "../dataModel/foodModel";

const URL = API_URL + '/foods'

const getFood = async <T>(cb: (result: T) => void) => {
  const result = await axios.get(URL)
  cb(result.data)
}

const postFood = async (data: foodForm, cb: (result: boolean) => void) => {
  await axios.post(`${URL}/create`, data)
  cb(true)
}

const deleteFood = async <T>(id: number, cb: (result: T) => void) => {
  const result = await axios.get(`${URL}/delete/${id}`)
  cb(result.data)
}

const editFood = async <T>(id: number, data: foodForm, cb: (result: T) => void) => {
  const result = await axios.post(`${URL}/edit/${id}`, data)
  cb(result.data)
}

const detailFood = async <T>(id: number, cb: (result: T) => void) => {
  const result = await axios.get(`${URL}/edit/${id}`)
  cb(result.data)
}

export { getFood, postFood, deleteFood, editFood, detailFood }


