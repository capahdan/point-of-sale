import React from 'react'
import { useState } from 'react';
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
import { FormControl,InputLabel,Select,MenuItem } from '@mui/material';



export default function StockAdd() {

  
  const {state} = useLocation()
  const [products ,setProducts]= useState([]);
  const [product ,setProduct]= useState(state===null ? '': state.product_id);
  const [detail ,setDetail]= useState(state===null ? '': state.detail);
  const [quantity ,setQuantity]= useState(state===null ? '': state.quantity);
  const [suppliers ,setSuppliers]= useState([]);
  const [supplier ,setSupplier]= useState(state===null ? '': state.supplier_id);

  const navigate= useNavigate()

  React.useEffect(() => {
    axios.get('http://localhost:5001/v1/product?page=1&limit=20').then((response) => {
      setProducts(response.data.data.products)
    });
    axios.get('http://localhost:5001/v1/supplier?page=1&limit=20').then((response) => {
      setSuppliers(response.data.data.suppliers)
    });
  }, []);
 
  
  const HandleSubmit2 = async e=>{
    e.preventDefault();    
    try{
      await axios.post('http://localhost:5001/v1/stock',
        {
          product_id:parseInt(product),
          supplier_id:parseInt(supplier),
          detail,
          quantity:parseInt(quantity)
        })
        navigate('/stock', {state:"ditambahkan"})
      } catch(error){
        console.log(error)
      }
}

const HandleSubmitEdit = async e=>{
  e.preventDefault();    
  try{
    await axios.put(`http://localhost:5001/v1/stock/${state.id}`,
      {
          product_id:parseInt(product),
          supplier_id:parseInt(supplier),
          detail,
          quantity:parseInt(quantity)
      })
      navigate('/stock', {state:"diedit"})
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
               {state === null ? 'Add Stock' : 'Edit Stock'} 
               </Typography>
            </Toolbar>
            <form onSubmit={state===null ? HandleSubmit2: HandleSubmitEdit}>
              <Container>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Product
                  </Typography>
                  <FormControl fullWidth size="small" sx={{marginLeft:'1rem'}}>
                    <InputLabel id="demo-simple-select-label" >Product</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={product}
                      label="Product"
                      onChange={(e) => setProduct(e.target.value)}
                      >
                      {products.map((pd) => {
                        return (
                          <MenuItem value={pd.id}>{pd.name}</MenuItem>
                          )
                        }
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Supplier
                  </Typography>
                  <FormControl fullWidth size="small" sx={{marginLeft:'1rem'}}>
                    <InputLabel id="demo-simple-select-label" >Supplier</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={supplier}
                      label="Supplier"
                      onChange={(e) => setSupplier(e.target.value)}
                      >
                      {suppliers.map((sp) => {
                        return (
                          <MenuItem value={sp.id}>{sp.name}</MenuItem>
                          )
                        }
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Quantity
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  size="small" 
                  sx={{marginLeft:'1rem'}}
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                   />
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Detail
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  size="small" 
                  sx={{marginLeft:'1rem'}}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                   />
                </div>
                <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1rem'}}>
                <Button color={state===null? "success":"warning"} type="submit" sx={{marginLeft:'0.5rem'}} variant="contained">{state === null?'Save':'Edit'}</Button>
                <Button color="error" sx={{marginLeft:'0.5rem'}} variant="contained"><Link sx={{textDecoration:'none', color:"inherit"}} href="/stock" underline="always">Cancel</Link></Button>
                </div>
              </Container>
            </form>
          </Paper>
        </Box>
    )
}

