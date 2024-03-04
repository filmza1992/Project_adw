import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login/login'
import HomePage from './pages/home/home'
import RankPage from './pages/rank/rank'
import ProfilePage from './pages/profile/profile'
import SignInPage from './pages/signIn/signIn'
import UpLoadProfilePage from './pages/profile/UpLoadProfile'
import ChangeImgPage from './pages/changeImg/changeImg'
import './App.css'

function App() {

  
const routers = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/rank", element: <RankPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/signIn", element: <SignInPage /> },
  { path: "/UpLoadProfile", element: <UpLoadProfilePage /> },
  { path: "/changeImg", element: <ChangeImgPage /> },
]);
  return (
    <>
    <RouterProvider router={routers} />
    
  </>
  )
}

export default App
