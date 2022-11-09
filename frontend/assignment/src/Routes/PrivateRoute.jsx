import {Navigate, useLocation} from "react-router-dom"
import { AppContext } from "../Context/AppContextProvider";
import React from "react";

//Create the HOC for protected Routes
const PrivateRoute = ({children}) => {
   

    const { isAuth } = React.useContext(AppContext);
  console.log(isAuth)

    if (!isAuth) {
      return <Navigate to="/login" ></Navigate>;
    }
    
    return children;
};

export default PrivateRoute;