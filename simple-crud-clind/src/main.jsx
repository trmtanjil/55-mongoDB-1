import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


  import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './Mainlayout/MainLayout.jsx';
import Home from './Mainlayout/Home.jsx';
import UserDetails from './Components/UserDetails.jsx';
import EditUser from './Components/EditUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
      {index:true,
        Component:App
      },
      {
        path:'/home',
        Component:Home,
      },
      {
        path:'/users/:id',
        loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`),
        Component:UserDetails,
      },
      {
        path:'/edituser/:id',
      loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`),
        Component:EditUser,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
