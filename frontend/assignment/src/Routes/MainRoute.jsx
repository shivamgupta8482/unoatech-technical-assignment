import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Admin from '../Components/Admin';
import Dashboard from '../Components/Dashboard';
import Home from '../Components/Home';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import PrivateRoute from './PrivateRoute';


const MainRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
        <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>}></Route>

        
        
        
       
    </Routes>
  )
}

export default MainRoute