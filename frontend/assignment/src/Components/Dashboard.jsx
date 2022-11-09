import React from 'react'
import { AppContext } from '../Context/AppContextProvider';

const Dashboard = () => {
    const { userid,data,getData,handleBook,handleCancel } = React.useContext(AppContext);
    
  return (
    
    <>
       {
  
  data.map(e=>(
   <li key={e._id}>{e.room}
   <h6>{e.status}</h6>
  
   {
  e.status=="pending" ?<>

    <button disabled={true}>Book</button>
    <button onClick={()=>{handleCancel(e._id)}}>Cancel</button></>
    :<button onClick={()=>handleBook(e._id)}>Book</button>
   }
   </li>
  ))
}
       
    </>
        
        
       
  )
}

export default Dashboard