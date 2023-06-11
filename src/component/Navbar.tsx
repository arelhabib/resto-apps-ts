import { FaBuilding, FaFacebook, FaHome, FaLinkedin, FaUtensils } from "react-icons/fa"
import { LuWheat } from "react-icons/lu"
import { TbSquareCheckFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom"
import Animated from "../helpers/Animated";

const Navbar = () => {
  const locationPath = useLocation().pathname

  const routes = [
    { path: '/', name: 'Home', icon: <FaHome /> },
    { path: '/restaurants', name: 'Restaurants', icon: <FaBuilding /> },
    { path: '/recipes', name: 'Recipes', icon: <TbSquareCheckFilled /> },
    { path: '/foods', name: 'Foods', icon: <FaUtensils /> },
    { path: '/ingredients', name: 'Ingredients', icon: <LuWheat /> },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container animated">
        <Animated>
          <Link className="navbar-brand fw-bold fs-4" to="/">Resto<span className="text-secondary opacity-50">Kita</span></Link>
        </Animated>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 animated">
            {routes.map((route, index) => (
              <li className="nav-item" key={index}>
                <Animated>
                  <Link
                    className={locationPath === route.path ?
                      "nav-link active fw-bold border-bottom border-2 border-dark me-2" : "nav-link"}
                    to={route.path}
                  >
                    {locationPath === route.path ? <i className="me-1">{route.icon}</i> : null}
                    {route.name}
                  </Link>
                </Animated>
              </li>
            ))}
          </ul>

          <Animated>
            {locationPath === '/' ?
              <>
                <i className="fs-5 mx-2"><FaLinkedin /></i>
                <i className="fs-5 mx-2"><FaFacebook /></i>
              </> :
              <>
                <div className="dropdown">
                  <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user me-2"></i> <span className="opacity-50">Hi!, owner</span></button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#"><i className="bi bi-gear"></i> Profile</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right"></i> Logout</a>
                    </li>
                  </ul>
                </div>
              </>}
          </Animated>


        </div>

      </div>
    </nav >
  )
}

export default Navbar