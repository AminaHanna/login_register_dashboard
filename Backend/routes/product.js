import express from "express"
import mongoose from "mongoose";
import multer from "multer";
// import path

const productRouter = express.Router();

// productRouter.post("/",(req,res))
// productRouter.get("/")
// productRouter.put("/")
// productRouter.delete("/")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file);
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })

  const upload = multer({ storage: storage })



productRouter.post('/',upload.single("profile_pic"),(req,res)=>{
   
    console.log(req.file,'ggggg')
    // return true;
    mongoose.connection.collection("product").insertOne({...req.body,profile_pic:req.file?.filename})
    res.json({message:"uploaded"});
});


productRouter.get('/',async(req,res)=>{
    // console.log(req.body);

    const response = await mongoose.connection.collection("product").find().toArray();

    if(response.lenght === 0)
    return res.status(400).json({message:"no data"})

    res.status(200).json({products:response})
});


productRouter.delete('/:id',async(req,res)=>{
    console.log(req.body,'body');
    console.log(req.params.id,'params');
    const response = await mongoose.connection.collection("product").deleteOne({_id:new mongoose.Types.ObjectId(req.params.id)});

    if(response){
    return res.status(200).json("deleted succesfully")
    }
    else{
    return res.status(404).json({message:"can't delete"});
    }
})


export default productRouter;