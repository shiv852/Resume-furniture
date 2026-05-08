import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Content from './routes/Content.jsx'
import { Provider } from 'react-redux'
import furnitureStore from './store/index.js'
import ForgotPassword from './routes/ForgotPassword.jsx'
import LoginUp from './routes/LoginUp.jsx'
import SignUp from './routes/SignUp.jsx'
import ProductdetailsPage from './components/ProductdetailsPage.jsx'
import ProductPage from './routes/ProductPage.jsx'
import ProfilePage from './components/Profile/ProfilePage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Checkout from './routes/Checkout.jsx'
import OrderSuccess from './routes/OrderSuccess.jsx'

const GoogleAuthWrapper=()=>{
  return(
    <GoogleOAuthProvider clientId='871841251134-9vnnp6d2g99ok81gss4ocguas92ut1fb.apps.googleusercontent.com'>
      <LoginUp></LoginUp>
    </GoogleOAuthProvider>
  )
}

   const router=createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {path:"/" , element:<Home/>},
        {path:"/content" , element:<Content/>},
        {path:"/products" , element:<ProductPage/>},
  {path:"/checkout", element:<Checkout/>},
  {path:"/order-success/:id", element:<OrderSuccess/>},
        {path:"/login" , element:<GoogleAuthWrapper/>},
        {path:"/forgotpassword" , element:<ForgotPassword/>},
        {path:"/signup" , element:<SignUp/>},
        {path:"/product/:name" , element:<ProductdetailsPage/>},
        {path:"/profilepage" , element:<ProfilePage/>},
      ]
    }
   ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <Provider store={furnitureStore}>
   <RouterProvider router={router}/> 
    </Provider>
  </React.StrictMode>,
)
