import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconContext } from "react-icons/lib";
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import { Food, Ingredient, Restaurant } from './EditPages';
import Animated from '../../helpers/Animated';

const Edit = () => {
  const [locationPage, setlocationPage] = useState<JSX.Element>()
  const location = useLocation()
  const navigate = useNavigate()

  const pageHandler = useCallback(() => {
    switch (location.state.prevPath) {
      case '/restaurants':
        return <Restaurant itemId={location.state.itemId} />

      case '/foods':
        return <Food itemId={location.state.itemId} />

      case '/ingredients':
        return <Ingredient itemId={location.state.itemId} />

      default:
        break

    }
  },
    [location],
  )

  useEffect(() => {
    setlocationPage(pageHandler())
  }, [pageHandler])


  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-6 mx-auto">
          <Animated>
            <h5
              className="btn"
              onClick={() => {
                navigate(-1);
              }}
            >
              <IconContext.Provider value={{ size: "2rem" }}>
                <BsFillArrowLeftCircleFill />
              </IconContext.Provider>
            </h5>
            {locationPage}
          </Animated>
        </div>
      </div>
    </div>

  )
}

export default Edit