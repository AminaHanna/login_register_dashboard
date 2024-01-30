import express, { request, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt  from "bcrypt";
import productRouter from "./routes/product.js"


import { fileURLToPath } from 'url';
import { dirname,join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const dirnamee = dirname(__filename);


const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.use(express.static(join(dirnamee, 'uploads')));
// console.log(`${dirnamee}/uploads`);
const saltRounds = 10;


mongoose.connect("mongodb://127.0.0.1:27017/nw_db").then((res)=>{
    console.log("connected");
}).catch((err)=>{
    console.log('db error',err);
})


app.get("/",(req,res)=>{
    res.end();
})




app.post('/api/register',(req,res)=>{
    console.log(req.body);

    // mongoose.connection.collection("users").insertOne(req.body).then((response))
    // res.json({message:"succesfully inserted data into db"});

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // console.log(hash,"hash...");
        try{
            console.log(hash);
            console.log("hash...");
            mongoose.connection.collection("users").insertOne({...req.body,password:hash}).then((res)=>{
                console.log("connected...");
            }).catch((err)=>{
                console.log(err);
            })
        }catch(error){
            console.log(error.message);
        }
        

    });
    res.json({message:"successfully inserted..."})

});


 

app.post('/api/login',async(req,res)=>{
    console.log(req.body);

    // let response = await mongoose.connection.collection("users").find({email:req.body.email,password:req.body.password}).toArray();

    // console.log(response,"response...");

    try{
        mongoose.connection.collection("users").findOne({email:req.body.email}).then((response)=>{
            // console.log(response,'res');
            if(response){
                bcrypt.compare(req.body.password, response.password, function(err, result) {
                    if(result){
                        //  console.log("...");

                        console.log(result,"result...");
                        res.status(200).json({user:result,message:"success...."});
                    }else{
                        res.status(400).json({message:"Invalid email or password..."});
                    }
                });
            }
        })
    }catch(error){
        console.log(error,"error...");
    }
    
})

// "use" method use aakkyaal vere index ndaakii ayl amk eene use aakkaan pattm
app.use('/api/product',productRouter)

app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
})