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



export default function SupplierAdd() {

  
  const {state} = useLocation()
  const [name ,setName]= useState(state===null ? '': state.name);
  const [email ,setEmail]= useState(state===null ? '': state.email);
  const [phone_number ,setPhoneNumber]= useState(state===null ? '': state.phone_number);
  const [address ,setAddress]= useState(state===null ? '': state.address);
  const navigate= useNavigate()


  const HandleSubmit2 = async e=>{
    e.preventDefault();    
    try{
      await axios.post('http://localhost:5001/v1/supplier',
        {
          name,
          email,
          phone_number,
          address
        })
        navigate('/supplier', {state:"ditambahkan"})
      } catch(error){
        console.log(error)
      }
}

const HandleSubmitEdit = async e=>{
  e.preventDefault();    
  try{
    await axios.put(`http://localhost:5001/v1/supplier/${state.id}`,
      {
        name,
        email,
        phone_number,
        address
      })
      navigate('/supplier', {state:"diedit"})
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
               {state === null ? 'Add Supplier' : 'Edit Supplier'} 
               </Typography>
            </Toolbar>
            <form onSubmit={state===null ? HandleSubmit2: HandleSubmitEdit}>
              <Container>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Name
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  name="small" 
                  sx={{marginLeft:'1rem'}}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                   />
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Email
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  name="small" 
                  sx={{marginLeft:'1rem'}}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Phone Number
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  name="small" 
                  sx={{marginLeft:'1rem'}}
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                   />
                </div>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Address
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  name="small" 
                  sx={{marginLeft:'1rem'}}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                   />
                </div>
                <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1rem'}}>
                <Button color={state===null? "success":"warning"} type="submit" sx={{marginLeft:'0.5rem'}} variant="contained">{state === null?'Save':'Edit'}</Button>
                <Button color="error" sx={{marginLeft:'0.5rem'}} variant="contained"><Link sx={{textDecoration:'none', color:"inherit"}} href="/supplier" underline="always">Cancel</Link></Button>
                </div>
              </Container>
            </form>
          </Paper>
        </Box>
    )
}

