import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Food, Ingredient, Recipe, Restaurant } from './DashPages'

const Dashboard = () => {
  const [locationPage, setlocationPage] = useState<JSX.Element>();
  const location = useLocation();

  const pageHandler = useCallback(() => {
    switch (location.pathname) {
      case '/restaurants':
        return <Restaurant />

      case '/recipes':
        return <Recipe />

      case '/foods':
        return <Food />

      case '/ingredients':
        return <Ingredient />

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
    <>
      <div className="container my-5">
        <div className="row border border-light-subtle p-5 rounded-3">
          <div className="col">
            <Outlet />
            {locationPage}
          </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard