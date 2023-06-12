import { useEffect, useState } from "react"
import { detailIngredient, editIngredient } from "../../../axios/ingredient"
import { ingredientForm } from "../../../dataModel/ingredientModel"

const Ingredient = (props: { itemId: number }) => {
  const [editForm, seteditForm] = useState<ingredientForm | null>(null)

  const submitHandler = () => {
    if (editForm) {
      editIngredient(props.itemId, editForm, (cb) => cb && window.location.replace('/ingredients'))
    }
  }

  useEffect(() => {
    detailIngredient(props.itemId, (cb: ingredientForm) => seteditForm(cb))
  }, [props])

  return (
    <>
      {editForm &&
        <form onSubmit={
          (event) => {
            event.preventDefault()
            submitHandler()
          }}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" value={editForm.name} className="form-control" placeholder="Input Name" id="name"
              onChange={(e) => seteditForm({ ...editForm, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="price">Price</label>
            <input type="number" value={editForm.price} className="form-control" placeholder="Price only number" id="price" required
              onChange={(e) => seteditForm({ ...editForm, price: Number(e.target.value) })}
            />
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" type="submit">Update</button>
          </div>
        </form>}
    </>

  )
}

export default Ingredient