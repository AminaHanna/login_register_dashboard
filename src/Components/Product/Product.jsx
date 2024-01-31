import { Avatar, Box, Button, Grid, Paper, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { errorToast, successToast } from "../Error";
import Orders from "../Dashboard/Orders";
import axios, { Axios } from "axios";

function Product(){

    const [data,setData] = useState([]);
    const [image,setImage] = useState(null)
    const [imagePreview,setImagePreview] = useState(null)

    const productName = React.useRef(null);
    const productDescription = React.useRef(null);
    const productRate = React.useRef(null);

  const [refresh,setrefresh] = React.useState(true)

  
    const handleSubmit = async() =>{
        // alert(productName.current.value)

           
            const formdata = new FormData()

            formdata.append("prdct_name",productName.current.value)
            formdata.append("prdct_description",productDescription.current.value)
            formdata.append("prdct_rate",productRate.current.value)
            formdata.append("profile_pic",image)
      

            try{
            const response = await axios.post("http://localhost:3002/api/product",formdata);
      
            const resData = response.data;
            successToast(resData.message)
            setrefresh(!refresh)
      
            console.log("response for api");
      
          } catch (error) {
            errorToast(error.message)
          }
    }

    const fetchData = async() =>{
        try{
            const response = await axios.get("http://localhost:3002/api/product");
            setData(response.data.products)
        }catch(error){
            console.log(error,"errorrr");
        }
    }

    const handleChangeImage = (e)=>{
        console.log(e.target.files[0],'ee');
        setImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(()=>{
        fetchData()
    },[refresh])

    const callback = ()=>{

    }

    return(
        <>
        <div className="">
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <Avatar alt="Remy Sharp"  src={imagePreview} style={{width:"100px",height:"100px"}}  />

      <TextField
       inputRef={productName}
       id="outlined-basic"
       label="Product Name"
       variant="outlined" />

      <TextField
       inputRef={productDescription}
       id="filled-basic"
       label="Description" 
       variant="filled" />

      <TextField 
       inputRef={productRate} 
       id="standard-basic" 
       label="Rate" 
       variant="standard" />

       <input type="file" name="" onChange={handleChangeImage} id="" accept="image/*" />

    </Box>


        <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </div>

        <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders refresh={refresh} data={data} setrefresh={setrefresh}/>
                </Paper>
              </Grid>
        </>
    )
}
export default Product