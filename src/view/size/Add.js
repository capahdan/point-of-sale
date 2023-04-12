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



export default function SizeAdd() {

  
  const {state} = useLocation()
  const [size ,setSize]= useState(state===null ? '': state.size);
  const navigate= useNavigate()

 
  
  const HandleSubmit2 = async e=>{
    e.preventDefault();    
    try{
      await axios.post('http://localhost:5001/v1/size',
        {
          size,
        })
        navigate('/size', {state:"ditambahkan"})
      } catch(error){
        console.log(error)
      }
}

const HandleSubmitEdit = async e=>{
  e.preventDefault();    
  try{
    await axios.put(`http://localhost:5001/v1/size/${state.id}`,
      {
        size,
      })
      navigate('/size', {state:"diedit"})
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
               {state === null ? 'Add Size' : 'Edit Size'} 
               </Typography>
            </Toolbar>
            <form onSubmit={state===null ? HandleSubmit2: HandleSubmitEdit}>
              <Container>
                <div style={{display:'flex' , marginTop:'0.5rem', alignItems:'center'}}>
                  <Typography sx={{width:'8rem'}}>
                    Size
                  </Typography>
                  <TextField 
                  fullWidth id="fullWidth" 
                  size="small" 
                  sx={{marginLeft:'1rem'}}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                   />
                </div>
                <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1rem'}}>
                <Button color={state===null? "success":"warning"} type="submit" sx={{marginLeft:'0.5rem'}} variant="contained">{state === null?'Save':'Edit'}</Button>
                <Button color="error" sx={{marginLeft:'0.5rem'}} variant="contained"><Link sx={{textDecoration:'none', color:"inherit"}} href="/size" underline="always">Cancel</Link></Button>
                </div>
              </Container>
            </form>
          </Paper>
        </Box>
    )
}

