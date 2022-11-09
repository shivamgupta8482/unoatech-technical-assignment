const connection = require("./Config/db");
const {UserModel} = require("./Model/User.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const {RoomModel} = require("./Model/roomsdata.model")
const cors=require("cors");
app.use(cors());
require("dotenv").config()

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

//signup of application-----------------------------------------------------------------------------------------------------
app.post("/signup", async (req, res) => {
    const { name,email,password } = req.body;
    let user_already_present = await UserModel.findOne({email});
    if(user_already_present) res.send({"message":"user already present"});
   else{
     bcrypt
      .hash(password, 7)
      .then(async function (hash) {
        const new_user = new UserModel({
           email:email,
           name:name,   
            password:hash
        });
        
        await new_user.save();
        res.send({"message":"sign up successful"});
      })
      .catch((err) => {
        res.send({"error":"some error occured"});
      });
   }
  });
//login----------------------------------------------------------------------------------------------------
  app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if(!user) res.send({"message":"no such user exists"})
    else{
        const hashed_password = user.password;
    const user_id = user._id;
  //  console.log(user)
   // console.log(user_id)
    bcrypt.compare(password, hashed_password, function(err, result) {
          if(err){
            res.send({"msg" : "Something went wrong, try again later"})
          }
          if(result){
            const token = jwt.sign({user_id}, process.env.SECRET_KEY);  
            res.send({message : "Login successfull", token,user_id})
          }
          else{
            res.send({"msg" : "Login failed"})
          }
    });
    }
})

//authentication middleware-------------------------------------------------------------------------------------

const authentiation = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token) res.send("please sign in");
    else{
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
          //  console.log(token); 
            const user_id =decoded.user_id;
            if(err){
                res.send("something went wrong");
            }
            // if(!user_id){
            //     res.send("please log in ")
            // }
           
            if(decoded){
               
            req.body.user_id = user_id
            next();
           }
           else{
            res.send("please login");
           }
          });
    }

}

//admin access-------------------------------------------------------------------------------------------------
const admin = async (req,res,next)=>{
    //const token = req.headers.authorization.split(" ")[1];
    const user_id = req.body.user_id;
    const user = await UserModel.findOne({user_id});
    if(user.role=="admin"){
        next
    }else{
        res.send("you are not authenticated to access this route")
    }
   

}
//createroom----------------------------------------------------------------------------------------------------

app.post("/createroom",authentiation,admin,async (req, res) => {
    const { room,status } = req.body;
    
  
        const new_user = new RoomModel({
          room,
          status
        });
        
        await new_user.save();
        res.send("added successful");
     
   
  });


//dashboard-----------------------------------------------------------------------------------------------------------

app.get("/dashboard",authentiation,async (req,res)=>{
//     const {user_id} = req.body;
// //     const {user_id} = req.user_id;
//     const user = await signupModel.findOne({user_id});
//     //console.log(user);
//     const {email} = user;
//      //console.log(email);
// res.send({email});
const data = await RoomModel.find();
res.send(data);
})



//bookdata-------------------------------------------------------------------------------------------------------------


app.post("/book",authentiation,async (req,res)=>{
      const id = req.headers.authorization.split(" ")[2];

//console.log(req.headers.authorization.split(" ")[2]);

      const {user_id} = req.body;
      const user = await UserModel.findOne({user_id});
       console.log(user.email,user_id);
       
        //console.log(email);
   //     const room2 = await RoomModel.findOne({id});
      const room = await RoomModel.updateOne({_id:id}, {$set:{status:"pending",email:`${user.email}`,userid:`${user_id}`}})
      
        const room1 = await RoomModel.findOne({id});
        //console.log(room2);
        res.send({"room1":room1,"id":id});
 // const data = await RoomModel.find();
 // res.send(data);
  })

//handleCancel--------------------------------------------------------------------------------------------------------

app.post("/book/cancel",authentiation,async (req,res)=>{
  const id = req.headers.authorization.split(" ")[2];

//console.log(req.headers.authorization.split(" ")[2]);

   const {user_id} = req.body;
 //  const user = await UserModel.findOne({user_id});
  //  console.log(user.email,user_id);
   
    //console.log(email);
//     const room2 = await RoomModel.findOne({id});
  const room = await RoomModel.updateOne({userid:user_id,_id:id}, {$set:{status:"available",email:"",userid:""}})
  
   // const room1 = await RoomModel.findOne({id});
    //console.log(room2);
    res.send({"message":"booking canceled"});
// const data = await RoomModel.find();
// res.send(data);
})


// app.get("/admin",authentiation,admin,async (req,res)=>{
//   //     const {user_id} = req.body;
//   // //     const {user_id} = req.user_id;
//   //     const user = await signupModel.findOne({user_id});
//   //     //console.log(user);
//   //     const {email} = user;
//   //      //console.log(email);
//   // res.send({email});
//   const data = await RoomModel.find({status:"pending"});
//   res.send(data);
//   })





app.listen(8080, async()=>{
    try{
await connection;
console.log("connected to db sucessfully");
    }catch(err){
        console.log("not able to connect");

    }
})