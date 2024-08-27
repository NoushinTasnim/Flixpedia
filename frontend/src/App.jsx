import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Dashboard from "./routes/Dashboard"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import Details from "./routes/Details"
import WatchProviders from "./components/WatchProviders"
import Reviews from "./components/Reviews"

function App() {
  const {user, isAuthChecking, authCheck} = useAuthStore();
  console.log("auth user is here: ", user);

  useEffect(() => {
      authCheck();
    },
    []
  );
  return (
    <>
      <Routes>
        <Route path = '/' element = {user ? <Dashboard/> : <Home/>}/>
        <Route path = '/login' element = {!user ? <Login/> : <Navigate to={'/'}/>}/>
        <Route path = '/register' element = {!user ? <Register/> : <Navigate to={'/'}/>}/>
        <Route path = '/dashboard' element = {user ? <Dashboard/> : <Navigate to={'/login'}/>}/>
        <Route path='/details/:id' element={user ? <Details/> : <Navigate to={'/login'}/>}/>
        <Route path="/watch-providers/:id" element={user ? <WatchProviders/> : <Navigate to={'/login'}/>} />
        <Route path="/reviews/:id" element={user ? <Reviews/> : <Navigate to={'/login'}/>} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
