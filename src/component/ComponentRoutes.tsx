import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard/Dashboard'
import Edit from "../pages/Edit/Edit";
import Navbar from './Navbar';
import FoodDetail from '../pages/Dashboard/FoodDetail';

const ComponentRoutes = () => {
  const location = useLocation().pathname.split('/')[2]

  return (
    <div>
      {location !== "edit" && <Navbar />}

      <Routes>
        <Route path='' element={<Home />}></Route>
        <Route path='/restaurants' element={<Dashboard />}></Route>
        <Route path='/recipes' element={<Dashboard />}></Route>
        <Route path='/foods' element={<Dashboard />}>
          <Route path='detail' element={<FoodDetail />}></Route>
        </Route>
        <Route path='/ingredients' element={<Dashboard />}></Route>

        <Route path='/restaurants/edit' element={<Edit />}></Route>
        <Route path='/recipes/edit' element={<Edit />}></Route>
        <Route path='/foods/edit' element={<Edit />}></Route>
        <Route path='/ingredients/edit' element={<Edit />}></Route>
      </Routes>
    </div >
  )
}

export default ComponentRoutes