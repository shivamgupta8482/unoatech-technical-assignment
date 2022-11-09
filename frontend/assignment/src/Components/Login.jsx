import React from 'react'
import { AppContext } from '../Context/AppContextProvider';

const Login = () => {
    const { email,password,setEmail,setPassword,handleLogin,isAuth } = React.useContext(AppContext);
  return (
    <div>
      {
        isAuth?
          <button>LOGOUT</button>
        :<>  <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter email'/>
        <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter password' />
       
        
        <button onClick={handleLogin}>Login</button></>
      }
    </div>
  )
}

export default Login