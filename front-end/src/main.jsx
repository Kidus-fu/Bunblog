import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router';
import SignupPage from './compuntes/Singup.jsx';
import LoginPage from './compuntes/Login.jsx';
import UserProfilePage from './compuntes/UserInfo.jsx';
import Userpage from './compuntes/Userpage.jsx';
import AboutUs from './compuntes/AboutUs.jsx';
import Setting from './compuntes/setting.jsx';
import SinglPost from './extr_com/SinglPost.jsx';
import LiveAreaChart from './extr_com/disbord.jsx';
import {NextUIProvider} from '@nextui-org/react'
import Search from './extr_com/Serach.jsx';
import Profile from './compuntes/Profile.jsx';

const router = createBrowserRouter([
  {
      path:"/",
      element:<App />,
  },
  {
    path:"/signup",
    element:<SignupPage />
  },
  {
    path:"/login",
    element:<LoginPage />
  },
  {
    path:"/signup/Profile/",
    element:<UserProfilePage />
  },
  {
    path:"/feed",
    element:<Userpage />,
    errorElement:<div>sdsssd</div>,
    children:[
      {
        path:"setting",
        element:<Search />
      }
    ]
  },
  
  {
    path:"/about",
    element:<AboutUs />
  },
  {
    path:"/settings",
    element:<Setting />
  },{
    path:'post/:id',
    element:<SinglPost />
  },{
    path:'dasbord/',
    element:<LiveAreaChart />
  },
  {
    path:"Profile/:username",
    element:<Profile />
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store} > 
   <StrictMode>
   <NextUIProvider>
    <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>
  </Provider>,
)
