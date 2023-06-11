import { useEffect, useState } from "react"
import { detailFood, editFood } from "../../../axios/food"
import { foodForm } from "../../../dataModel/foodModel"
import { getRestaurant } from "../../../axios/restaurant"
import { restaurantModel } from "../../../dataModel/restaurantModel"

const Food = (props: { itemId: number }) => {
  const [editForm, seteditForm] = useState({} as foodForm)
  const [restaurantList, setrestaurantList] = useState<restaurantModel[]>([])

  const submitHandler = () => {
    editFood(props.itemId, editForm, (cb) => cb && window.location.replace('/restaurants'))
  }

  useEffect(() => {
    detailFood(props.itemId, (cb: foodForm) => seteditForm(cb))

    getRestaurant((result: restaurantModel[]) => setrestaurantList(result))
  }, [props])

  return (
    <>
      {editForm &&
        <form onSubmit={(event) => {
          event.preventDefault()
          submitHandler()
        }}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" value={editForm.name} className="form-control" placeholder="Input Name" id="name" required
                onChange={(e) => seteditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image">Image url</label>
              <input type="url" value={editForm.image} className="form-control" placeholder="example: https://via.placeholder.com/150" id="image"
                onChange={(e) => seteditForm({ ...editForm, image: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price">Price</label>
              <input type="number" value={editForm.price} className="form-control" placeholder="Price only number" id="price" required
                onChange={(e) => seteditForm({ ...editForm, price: Number(e.target.value) })}
              />
            </div>
            <div className="mb-3"></div>
            <label htmlFor="restaurantId">Cabang Restaurant</label>
            <select className="form-select" id="restaurantId" required value={editForm ? editForm.restaurantId : ""}
              onChange={(e) => seteditForm({ ...editForm, restaurantId: Number(e.target.value) })}
            >
              <option disabled selected hidden value="">Pilih opsi</option>
              {restaurantList && restaurantList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>{item.name}</option>
                )
              })}
            </select>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" type="submit">Update</button>
          </div>
        </form>}
    </>

  )
}

export default Food