import React from 'react'
import { AppContext } from '../Context/AppContextProvider';

const Signup = () => {
    const { name,email,password,setName,setEmail,setPassword,handleSignup } = React.useContext(AppContext);
  return (
    <div>
        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter email'/>
        <input type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter password' />
        <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder='name'/>
        
        <button onClick={handleSignup}>Sign Up</button>
    </div>
  )
}

export default Signup