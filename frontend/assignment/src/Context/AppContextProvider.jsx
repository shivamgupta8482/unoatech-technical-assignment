import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [name,setName] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [res,setRes] = useState("");
  const [data,setData] = useState();
  const [userid,setUserid] =useState("");
  
  const navigate = useNavigate();
  const postdata = (data) => {
    fetch('http://localhost:8080/signup', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
  // console.log(data);
   if(data.message=="user already present"){
alert("user is already present")
   }
   else if(data.message=="sign up successful") {
    alert("signup succesful")
   }

  
  })
  .catch((error) => {
   // console.error('Error:', error);
   return error;
  });
  
    
  }
  //login------------------------------------------------------
  const logindata = (data) => {
    fetch('http://localhost:8080/login', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
  // console.log(data);
   if(data.message=="no such user exists"){
alert("Invalid user detail")
   }
   else if(data.message=="Login successfull") {
   setEmail("");
   setPassword("");
   setUserid(data.user_id);
   localStorage.setItem('token', data.token);
   
   setIsAuth(true);
   navigate('/dashboard');
    
   }

  
  })
  .catch((error) => {
    console.error('Error:', error);
   //return error;
  });
  
    
  }
  //getting data in dashboard-----------------------------------------------------------------------
  
  const getdata = ()=>{
    const authtoken = localStorage.getItem("token")
    fetch('http://localhost:8080/dashboard', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${authtoken}`
      }
     
    })
      .then((response) => response.json())
      .then((dataobj) => {
      //  console.log(dataobj);
       setData(dataobj);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

//console.log(data);
  const handleSignup=()=>{
const data={
    name:name,
    email:email,
    password:password
}
if(name && email && password){
 postdata(data);
 

}else{
    alert("fill all fields");
}
}


const handleLogin=()=>{
    const data={
        
        email:email,
        password:password
    }
    if(email && password){
        logindata(data);
       
       }else{
           alert("fill all fields");
       }
}

//handleBook---------------------------------------------------------------------------------------------------------
const handleBook=(id)=>{
  console.log(id);
  const authtoken = localStorage.getItem("token")
    fetch('http://localhost:8080/book', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${authtoken} ${id}`
  },
  body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
   console.log(data);
  getdata();
   

  
  })
  .catch((error) => {
    console.error('Error:', error);
   //return error;
  });
  
    
  
}

const handleCancel=(id)=>{
  console.log(id);
  const authtoken = localStorage.getItem("token")
    fetch('http://localhost:8080/book/cancel', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${authtoken} ${id}`
  },
  body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
   console.log(data);
  getdata();
   

  
  })
  .catch((error) => {
    console.error('Error:', error);
   //return error;
  });
  

}


useEffect(()=>{
    getdata();
    
},[])







  const value = { isAuth,setIsAuth,name,setName,email,setEmail,password,setPassword,handleSignup,userid,handleLogin,data,getdata,handleBook,handleCancel };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContextProvider };