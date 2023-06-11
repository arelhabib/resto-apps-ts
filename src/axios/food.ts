import axios from "axios";
import API_URL from "../config/config";

const URL = API_URL + '/foods'

const getFood = async <T>(cb: (result: T) => void) => {
  const result = await axios.get(URL)
  cb(result.data)
}

const postFood = async (data: object, cb: (result: boolean) => void) => {
  await axios.post(`${URL}/create`, data)
  cb(true)
}

const deleteFood = async <T>(id: number, cb: (result: T) => void) => {
  const result = await axios.get(`${URL}/delete/${id}`)
  cb(result.data)
}

const editFood = async <T>(id: number, data: object, cb: (result: T) => void) => {
  const result = await axios.post(`${URL}/edit/${id}`, data)
  cb(result.data)
}

const detailFood = async <T>(id: number, cb: (result: T) => void) => {
  const result = await axios.get(`${URL}/edit/${id}`)
  cb(result.data)
}

export { getFood, postFood, deleteFood, editFood, detailFood }


