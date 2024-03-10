import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomePage from './pages/home/home'
import RankPage from './pages/rank/rank'
import ProfilePage from './pages/profile/profile'
import SignInPage from './pages/signIn/signIn'
import EditProfilePage from './pages/profile/EditProfile'
import ChangeImgPage from './pages/changeImg/changeImg'
import './App.css'
import LoginAdminPage from './pages/login/loginAdmin'
import ChooseLoginPage from './pages/login/ChooseLogin'
import LoginUserPage from './pages/login/loginuser'
import AdminPage from './pages/admin/admin'
import ImageUpLoadPage from './pages/image/imageUpload'
import ShowProfilePage from './pages/profile/ShowProfile'
import ListProfilePage from './pages/profile/ListProfile'
function App() {

const routers = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/:id", element: <HomePage /> },

  { path: "/login", element: <ChooseLoginPage /> },
  { path: "/loginAdmin", element: <LoginAdminPage /> },
  { path: "/loginUser", element: <LoginUserPage /> },

  { path: "/rank/:id", element: <RankPage /> },
  { path: "/rank", element: <RankPage /> },

  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/ShowProfile/:id", element: <ShowProfilePage /> },
  { path: "/ListProfile/:id", element: <ListProfilePage /> },
  

  { path: "/signIn", element: <SignInPage /> },

  { path: "/UpLoadProfile/:id", element: <EditProfilePage /> },

  { path: "/admin/:id", element: <AdminPage /> },

  { path: "/imageUpLoad/:id", element: <ImageUpLoadPage /> },

  { path: "/changeImg/:id", element: <ChangeImgPage /> },
]);
  return (
    <>
    <RouterProvider router={routers} />
    
  </>
  )
}

export default App
