import React from 'react'
import { useState } from 'react';
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container'



export default function SaleSelectById() {

  
  const {state} = useLocation()
  const [products ,setProducts]= useState([]);
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });


  React.useEffect(() => {
    axios.get('http://localhost:5001/v1/product?page=1&limit=20').then((response) => {
      setProducts(response.data.data.products)
    });
  }, []);

    return (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{width:'100%', mb:2,height:550, boxShadow:'20'}} >
                {/* tabel */}
              <Container sx={{width: '75%', paddingTop:'1.2rem'}}> 
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 675 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={4} align="right">
                        {moment(state.created_at, 'YYYY-MM-DD HH:mm:ss.SSSZ').format('DD MMMM YYYY, HH:mm:ss')}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                        <Button color="primary" sx={{marginLeft:'0.5rem'}} variant="contained"><Link sx={{textDecoration:'none', color:"inherit"}} href="/sale" underline="always">Back</Link></Button>
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                          Details Sale
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Name Of Product</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Sum</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.items.map((row) => (
                        <TableRow key={row.desc}>
                          <TableCell>{products.find((pd)=>pd.id=== row.product_id)?.name}</TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">{formatter.format(products.find((pd)=>pd.id=== row.product_id)?.price)}</TableCell>
                          <TableCell align="right">{formatter.format(products.find((pd)=>pd.id=== row.product_id)?.price * row.quantity)}</TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{formatter.format(state.total_price)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Discount</TableCell>
                        <TableCell align="right">{state.discount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{formatter.format(state.final_price)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
             </TableContainer>
            </Container> 
          </Paper>
        </Box>
    )
}

