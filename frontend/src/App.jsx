import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Dashboard from "./routes/Dashboard"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"

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
        <Route path = '/dashboard' element = {<Dashboard/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
