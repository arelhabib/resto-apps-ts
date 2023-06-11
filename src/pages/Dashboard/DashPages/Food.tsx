import { useEffect, useState } from "react"
import { deleteFood, getFood, postFood } from "../../../axios/food"
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { foodModel, foodForm } from "../../../dataModel/foodModel";
import { Link } from "react-router-dom";
import { restaurantModel } from "../../../dataModel/restaurantModel";
import { getRestaurant } from "../../../axios/restaurant";
import Animated from "../../../helpers/Animated";

const Food = () => {
  const [foodList, setfoodList] = useState<foodModel[]>([])
  const [restaurantList, setrestaurantList] = useState<restaurantModel[]>([])
  const [newForm, setnewForm] = useState({} as foodForm)

  const submitHandler = () => {
    postFood(newForm, (cb) => cb && window.location.reload())
  }

  const deleteHandler = (id: number) => {
    deleteFood(id, (cb) => cb && window.location.reload())
  }

  useEffect(() => {
    getFood((result: foodModel[]) =>
      setfoodList(result)
    )

    getRestaurant((result: restaurantModel[]) =>
      setrestaurantList(result)
    )

  }, [])

  return (
    <div className="row">
      <div className="col-6"><h3 className="fw-bold">Foods Page</h3></div>
      <div className="col-6 text-end">
        <button type="button" className="btn btn-primary fw-bold opacity-75" data-bs-toggle="modal" data-bs-target="#addNew" data-bs-whatever="@mdo">Add New +</button>
      </div>
      <Animated transition="up">
        <table className="table table-striped table-resto animated-down">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Served in Restaurant</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {foodList && foodList.map((item, id) => {
              return (
                <tr key={id + 1}>
                  <th scope="row">{id + 1}</th>
                  <td>
                    <div className="row">
                      <div className="col-2">
                        <img className="img-fluid rounded-circle" src={item.image} alt="" width="70px" />
                      </div>
                      <div className="col-10">
                        <h5>
                          <Link to="/foods/detail" state={{ id: item.id }} className="text-decoration-none"> {item.name} </Link>
                        </h5>
                        <small className="badge bg-info">Rp. {item.price}</small>
                      </div>
                    </div>
                  </td>
                  {item.restaurant ?
                    <td>{item.restaurant.name}</td> :
                    <td>Not served in any restaurant</td>
                  }
                  <td>
                    <a className="btn btn-sm btn-danger opacity-80 me-2" onClick={() => deleteHandler(item.id)}> <FaTrashAlt /> </a>
                    <Link className="btn btn-sm btn-warning opacity-80"
                      to="/foods/edit" state={{ prevPath: location.pathname, itemId: item.id }}> <FaPen /> </Link>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </Animated>


      <div className="modal fade" id="addNew" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Food</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={(event) => {
              event.preventDefault()
              submitHandler()
            }}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" placeholder="Input Name" id="name" required
                    onChange={(e) => setnewForm({ ...newForm, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image">Image url</label>
                  <input type="url" className="form-control" placeholder="example: https://via.placeholder.com/150" id="image"
                    onChange={(e) => setnewForm({ ...newForm, image: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price">Price</label>
                  <input type="number" className="form-control" placeholder="Price only number" id="price" required
                    onChange={(e) => setnewForm({ ...newForm, price: Number(e.target.value) })}
                  />
                </div>
                <div className="mb-3"></div>
                <label htmlFor="restaurantId">Cabang Restaurant</label>
                <select className="form-select" id="restaurantId" required defaultValue=""
                  onChange={(e) => setnewForm({ ...newForm, restaurantId: Number(e.target.value) })}
                >
                  <option disabled hidden value="">Pilih opsi</option>
                  {restaurantList && restaurantList.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary" type="submit">Create</button>
              </div>
            </form>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Food