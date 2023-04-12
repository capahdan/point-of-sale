import React from 'react';
import { useState, useRef } from 'react';
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Image } from "@chakra-ui/react";


export default function CategoryAdd() {

  const {state} = useLocation()
  const [barcode,setBarcode]= useState(state===null ? '': state.barcode);
  const [name ,setName]= useState(state===null ? '': state.name);
  const [category,setCategory]= useState(state===null ? null: state.category_id);
  const [size,setSize]= useState(state===null ? null: state.size_id);
  const [price,setPrice]= useState(state===null ? null: state.price);
  const [detail_product,setDetailProduct]= useState(state===null ? '': state.detail_product);
  const navigate= useNavigate();
  const [categories, setCategories]= useState([])
  const [sizes, setSizes] = useState([])
  const imageRef = useRef(null);
  const [image, setImage] = useState(state===null ? null: `http://localhost:5001/image/${state.image}`);
  const [isChanged, setChangedImage]= useState(false)
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    setChangedImage(true)
  };

 
  React.useEffect(() => {
    axios.get('http://localhost:5001/v1/category?page=1&limit=20').then((response) => {
      setCategories(response.data.data.categories)
    });
    axios.get('http://localhost:5001/v1/size?page=1&limit=20').then((response) => {
      setSizes(response.data.data.sizes)
    });
  }, []);

  
  const HandleSubmit2 = async e=>{
    e.preventDefault();    
    const data = {
      barcode,
      name,
      category_id: parseInt(category),
      size_id: parseInt(size),
      price: parseInt(price),
      detail_product,
    };
    
    const formData = new FormData();
    formData.append("file", image);
    formData.append("data", JSON.stringify(data));
    
    try {
      await axios.post("http://localhost:5001/v1/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

        navigate('/product', {state:"ditambahkan"})
      } catch(error){
        console.log(error)
      }
}

const HandleSubmitEdit = async e=>{
  e.preventDefault();    
  const data = {
    barcode,
    name,
    category_id: parseInt(category),
    size_id: parseInt(size),
    price: parseInt(price),
    detail_product,
  };
  
  const formData = new FormData();
  formData.append("file", image);
  formData.append("data", JSON.stringify(data));
  
  try {
    await axios.put(`http://localhost:5001/v1/product/${state.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
      navigate('/product', {state:"diedit"})
    } catch(error){
      console.log(error)
    }
}




    return (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{width:'100%', mb:2,height:500, boxShadow:'20'}} >
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              }}
            > 
               <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
               {state === null ? 'Add Product' : 'Edit Product'} 
               </Typography>
            </Toolbar>
            <form onSubmit={state===null ? HandleSubmit2: HandleSubmitEdit}>
              <Container>
                <div style={{display:'flex', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Barcode
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  size="small" 
                  sx={{marginLeft:'1rem'}}
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)} 
                  />
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Name
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  size="small" 
                  sx={{marginLeft:'1rem'}}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                   />
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Category
                  </Typography>
                  <FormControl fullWidth size="small" sx={{marginLeft:'1rem'}}>
                    <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Age"
                      onChange={(e) => setCategory(e.target.value)}
                      >
                      {categories.map((cat) => {
                        return (
                          <MenuItem value={cat.id}>{cat.category}</MenuItem>
                          )
                        }
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Size
                  </Typography>
                  <FormControl fullWidth size="small" sx={{marginLeft:'1rem'}}>
                    <InputLabel id="demo-simple-select-label" >Size</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={size}
                      label="Age"
                      onChange={(e) => setSize(e.target.value)}
                      >
                      {sizes.map((sz) => {
                        return (
                          <MenuItem value={sz.id}>{sz.size}</MenuItem>
                          )
                        }
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Price
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  size="small" 
                  sx={{marginLeft:'1rem'}} 
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Detail Product
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  size="large" 
                  sx={{marginLeft:'1rem'}} 
                  value={detail_product}
                  onChange={(e) => setDetailProduct(e.target.value)}
                  />
                </div>
                <>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="gambar"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleChangeImage}
                  />
                    <Button
                      onClick={() => imageRef.current.click()}
                      sx={{width:'100%', marginTop:'1rem'}} size ="large" variant="contained" component="label"        >
                      Select Image
                    </Button>
                    <div style={{display:"flex",justifyContent:"center"}}>
                      {image && (
                          state === null || isChanged ?(
                            <Image
                            src={URL.createObjectURL(image)}
                            width="400px"
                            height="300px"
                            alt="selected image..."
                            />
                          ):(
                          <Image
                          src={image}
                          width="400px"
                          height="300px"
                          alt="selected image..."
                          />
                          )
                        )}
                    </div>

                </>
                <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1rem'}}>
                <Button color={state===null? "success":"warning"} type="submit" sx={{marginLeft:'0.5rem'}} variant="contained">{state === null?'Save':'Edit'}</Button>
                <Button color="error" sx={{marginLeft:'0.5rem'}} variant="contained"><Link sx={{textDecoration:'none', color:"inherit"}} href="/product" underline="always">Cancel</Link></Button>
                </div>
              </Container>
            </form>
          </Paper>
        </Box>
    )
}

