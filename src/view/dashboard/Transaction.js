import * as React from 'react';
import Title from './Title';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from 'axios'

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '16px', // adjust the gap as needed
});



export default function Transaction() {
  const [rows, setRows]= React.useState('')

  React.useEffect(() => {
    axios.get(`http://localhost:5001/v1/sale?page=1&limit=20`).then((response) => {
      setRows(response.data.data.total)
      console.log(response.data.data.total)
    });
  }, []);
  

  return (
    <Container>
      <ShoppingCartIcon color="action" sx={{ fontSize: "4rem" }} />
      <div>
        <Typography component="p" variant="h4">
          {rows}
        </Typography>
        <Title>Transaction</Title>  
      </div>
    </Container>
  );
}
