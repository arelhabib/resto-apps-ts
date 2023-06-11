import axios from "axios";
import API_URL from "../config/config";

const URL = API_URL + '/restaurants'

const getRestaurant = async <T>(cb: (result: T) => void) => {
  const result = await axios.get(URL)
  cb(result.data)
}

const postRestaurant = async (data: object, cb: (result: boolean) => void) => {
  await axios.post(`${URL}/create`, data)
  cb(true)
}

const deleteRestaurant = async <T>(id: number, cb: (result: T) => void) => {
  const result = await axios.get(`${URL}/delete/${id}`)
  cb(result.data)
}

const editRestaurant = async <T>(id: number, data: object, cb: (result: T) => void) => {
  const result = await axios.post(`${URL}/edit/${id}`, data)
  cb(result.data)
}

const detailRestaurant = async <T>(id: number, cb: (result: T) => void) => {
  const result = await axios.get(`${URL}/edit/${id}`)
  cb(result.data)
}

export { getRestaurant, postRestaurant, deleteRestaurant, editRestaurant, detailRestaurant }


