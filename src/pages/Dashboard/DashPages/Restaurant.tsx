import { useEffect, useState } from "react"
import { deleteRestaurant, getRestaurant, postRestaurant } from "../../../axios/restaurant";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { restaurantModel, restaurantForm } from "../../../dataModel/restaurantModel";
import { Link } from "react-router-dom";
import Animated from "../../../helpers/Animated";

const Restaurant = () => {
  const [restoList, setrestoList] = useState<restaurantModel[]>([])
  const [newForm, setnewForm] = useState({} as restaurantForm)

  const submitHandler = () => {
    postRestaurant(newForm, (cb) => cb && window.location.reload())
  }

  const deleteHandler = (id: number) => {
    deleteRestaurant(id, (cb) => cb && window.location.reload())
  }

  useEffect(() => {
    getRestaurant((result: restaurantModel[]) => {
      setrestoList(result)
    })
  }, [])

  return (
    <div className="row">
      <div className="col-6"><h3 className="fw-bold">Restaurants Page</h3></div>
      <div className="col-6 text-end">
        <button type="button" className="btn btn-primary fw-bold opacity-75" data-bs-toggle="modal" data-bs-target="#addNew" data-bs-whatever="@mdo">Add New +</button>
      </div>
      <Animated transition="up">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Total Foods</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {restoList && restoList.map((item, id) => {
              return (
                <tr key={id + 1}>
                  <th scope="row">{id + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.food?.length}</td>
                  <td>
                    <a className="btn btn-sm btn-danger opacity-80 me-2" onClick={() => deleteHandler(item.id)}> <FaTrashAlt /> </a>
                    <Link className="btn btn-sm btn-warning opacity-80"
                      to="/restaurants/edit" state={{ prevPath: location.pathname, itemId: item.id }}> <FaPen /> </Link>
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Restaurant</h1>
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

export default Restaurant