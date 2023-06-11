import { useEffect, useState } from "react"
import { detailRestaurant, editRestaurant } from "../../../axios/restaurant"
import { restaurantForm } from "../../../dataModel/restaurantModel"

const Restaurant = (props: { itemId: number }) => {
  const [editForm, seteditForm] = useState({} as restaurantForm)

  const submitHandler = () => {
    editRestaurant(props.itemId, editForm, (cb) => cb && window.location.replace('/restaurants'))
  }

  useEffect(() => {
    detailRestaurant(props.itemId, (cb: restaurantForm) => seteditForm(cb))
  }, [props])

  return (
    <>
      {editForm &&
        <form onSubmit={
          (e) => {
            e.preventDefault()
            submitHandler()
          }}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" value={editForm.name} className="form-control" placeholder="Input Name" id="name"
              onChange={(e) => seteditForm({ ...editForm, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" type="submit">Update</button>
          </div>
        </form>}
    </>

  )
}

export default Restaurant