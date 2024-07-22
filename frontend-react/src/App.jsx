
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useReducer } from "react";
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";

import Weather from "./component/Weather";

import Auth from "./component/auth/Auth";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import ForgotPassword from "./component/auth/ForgotPassword";
import Logout from "./component/auth/Logout";
import Error404 from "./component/Error404";

import Dashboard from "./component/user/Dashboard";

import { authUserInitial, authReducer } from './component/reducer/AuthReducer';
import { AuthContext } from './component/context/AuthContext';
import PrivateRoute from "./component/PrivateRoute";

function App() {

  const [authState, authDispatch] = useReducer( authReducer, authUserInitial );
  
  return (
    <>
    <AuthContext.Provider value={{authState, authDispatch}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city" element={<Weather />} />
  
          <Route path="/auth/sign-in" element={<Login />} />
          <Route path="/auth/sign-up" element={<Register />} />
          <Route path="/auth/logout" element={<Logout />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/user/dashboard" element={ <PrivateRoute component={Dashboard} />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
    </>
  )
}

export default App
