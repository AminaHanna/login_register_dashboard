import { useState } from 'react'
import './App.css'
import SignUp from './Components/Sign-Up/SignUp'
import SignIn from './Components/Sign-In/SignIn'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import Product from './Components/Product/Product';

function App() {
  const [count, setCount] = useState(0)


  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: 
    //   <div>
    //     <SignUp/>
    //     <SignIn/>
    //   </div>,
    // },
    
    {
      path:"signup",
      element: <SignUp/>,
    },
    {
      path:"signin",
      element: <SignIn/>,
    },
    {
      path:"dashboard",
      element: <Dashboard/>,
    },{
      path:"product",
      element: <Product/>,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
