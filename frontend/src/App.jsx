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
import Reviews from "./routes/Reviews"
import { Loader } from 'lucide-react'
import CastDetails from "./routes/CastDetails"
import NotFound from "./routes/NotFound"
import SearchPage from "./routes/SearchPage"

function App() {
  const {user, isAuthChecking, authCheck} = useAuthStore();

  useEffect(() => {
      authCheck();
    },
    [authCheck]
  );

  if(isAuthChecking){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-[#101010] h-full">
          <Loader className="animate-spin text-red-500 size-10"/>
        </div>
      </div>
    )
  }

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
        <Route path="/cast/:id" element={user ? <CastDetails/> : <Navigate to={'/login'}/>} />
        <Route path="/search" element= {user ? <SearchPage/> : <Navigate to={'/login'}/>} />
        <Route path="/not_found" element= {<NotFound/>} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
