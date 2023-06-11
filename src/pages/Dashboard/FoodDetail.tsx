import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { detailRecipe } from "../../axios/recipeFI"
import { recipeDetailModel } from "../../dataModel/recipeModel"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import Animated from "../../helpers/Animated"

const FoodDetail = () => {
  const [foodRecipeDetail, setfoodRecipeDetail] = useState({} as recipeDetailModel)
  const location = useLocation()

  useEffect(() => {
    const id = location.state.id
    detailRecipe(id, (result: recipeDetailModel) => setfoodRecipeDetail(result))
  }, [location])

  return (
    <>
      <Animated transition="up">
        <div className="container bg-body-tertiary rounded-3 py-3 my-5">
          <div className="row text-center m-4">
            <div className="col-md-4 bg-white shadow-sm p-3 mb-5 bg-body-light rounded">
              <div className="w-100">
                <img className="mb img-fluid rounded-circle border border-secondary-subtle border-3" src={foodRecipeDetail.image} alt="" />
              </div>
              <div className="w-100">
                <h3>{foodRecipeDetail.name}</h3>
                <div>
                  {foodRecipeDetail.ingredientsTotal <= foodRecipeDetail.price ?
                    <small className="badge bg-primary mb-2">Harga Makanan:<br /> Rp. {foodRecipeDetail.price}</small>
                    :
                    <OverlayTrigger placement="right"
                      overlay={<Tooltip>"Foods price lower than total ingredient price"</Tooltip>}
                    >
                      <small className="badge bg-danger mb-2">Harga Makanan:<br /> Rp. {foodRecipeDetail.price}</small>
                    </OverlayTrigger>

                  }
                  <br />
                  <small className="badge bg-primary">Total Harga Bahan:<br /> Rp. {foodRecipeDetail.ingredientsTotal}</small>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row ms-3">
                <ul className="nav nav-tabs mb-5">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page">Ingredients</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">Description</a>
                  </li>
                </ul>
                {foodRecipeDetail.ingredients ? foodRecipeDetail.ingredients.map((item) => {
                  return (
                    <div className="col-md-4" key={item.id}>
                      <div>
                        <img className="img-fluid rounded-circle" src={foodRecipeDetail.image} alt="" />
                      </div>
                      <div className="w-100">
                        <p className="fs-4">{item.name}</p>
                      </div>
                    </div>
                  )
                }) : <h3>No ingredient listed in this foods</h3>}
              </div>
            </div>
          </div>
        </div>
      </Animated>
    </>

  )
}

export default FoodDetail