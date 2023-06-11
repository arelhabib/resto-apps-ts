import React, { useEffect, useState } from "react"
import Select from "react-select"
import { deleteRecipe, getRecipe, postRecipe } from "../../../axios/recipeFI";
import { FaTrashAlt } from "react-icons/fa";
import { recipeForm, recipeModel, recipeViewModel } from "../../../dataModel/recipeModel";
import { foodModel } from "../../../dataModel/foodModel";
import { ingredientModel } from "../../../dataModel/ingredientModel";
import { getFood } from "../../../axios/food";
import { getIngredient } from "../../../axios/ingredient";
import Animated from "../../../helpers/Animated";

const Recipe = () => {
  const [recipeList, setrecipeList] = useState<recipeViewModel[]>([])
  const [foodList, setfoodList] = useState<foodModel[]>([])
  const [ingredientList, setingredientList] = useState<ingredientModel[]>([])
  const [newForm, setnewForm] = useState({} as recipeForm)

  const submitHandler = () => {
    postRecipe(newForm, (cb) => cb && window.location.reload())
  }

  const deleteHandler = (id: number) => {
    deleteRecipe(id, (cb) => cb && window.location.reload())
  }

  useEffect(() => {
    getRecipe((result: recipeModel[]) => {
      const uniqueList: recipeViewModel[] = [];

      result.forEach((item) => {
        const existingRecipe = uniqueList.find((recipe) => recipe.food === item.food.name);
        if (existingRecipe) {
          existingRecipe.ingredient.push(item.ingredient.name);
        } else {
          uniqueList.push({
            foodId: item.foodId,
            food: item.food.name,
            ingredient: [item.ingredient.name]
          });
        }
      });

      setrecipeList(uniqueList);
    })

    getFood((result: foodModel[]) => setfoodList(result))
    getIngredient((result: ingredientModel[]) => setingredientList(result))
  }, [])

  return (
    <div className="row">
      <div className="col-6"><h3 className="fw-bold">Recipes Page</h3></div>
      <div className="col-6 text-end">
        <button type="button" className="btn btn-primary fw-bold opacity-75" data-bs-toggle="modal" data-bs-target="#addNew" data-bs-whatever="@mdo">Add New +</button>
      </div>
      <Animated transition="up">
        <table className="table table-striped table-resto animated-down">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Food</th>
              <th scope="col">Ingredient</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {recipeList && recipeList.map((item, id) => {
              return (
                <tr key={id + 1}>
                  <th scope="row">{id + 1}</th>
                  <td>{item.food}</td>
                  <td className="text-truncate" style={{ maxWidth: "10rem" }} key={item.ingredient[0]}>
                    {item.ingredient.map((ingredItem, index) => {
                      return (
                        <React.Fragment key={index}>
                          {ingredItem}
                          {index !== item.ingredient.length - 1 ? <>, </> : null}
                        </React.Fragment>
                      )
                    })}
                  </td>
                  <td>
                    <a className="btn btn-sm btn-danger opacity-80" onClick={() => deleteHandler(item.foodId)}> <FaTrashAlt /> </a>
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Recipes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(event) => {
                event.preventDefault()
                submitHandler()
              }}>
                <div className="mb-3">
                  <select className="form-select" id="restaurantId" required defaultValue=""
                    onChange={(e) => setnewForm({ ...newForm, foodId: Number(e.target.value) })}
                  >
                    <option disabled hidden value="">Select Food</option>
                    {foodList && foodList.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <Select closeMenuOnSelect={false} isMulti={true}
                    onChange={(e) => setnewForm({
                      ...newForm, ingredientId: e.map((item) => item.value)
                    })}
                    options={
                      ingredientList.map((item) => {
                        return { value: item.id, label: item.name }
                      })
                    } />
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
    </div>
  )
}

export default Recipe