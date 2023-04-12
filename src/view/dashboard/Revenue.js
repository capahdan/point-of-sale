import * as React from 'react';
import Title from './Title';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios  from 'axios'

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '16px', // adjust the gap as needed
});

export default function Product() { 
const [rows, setRows]= React.useState('')
const [revenue, setRevenue] = React.useState('')
const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

React.useEffect(() => {
  axios.get(`http://localhost:5001/v1/sale?page=1&limit=20`).then((response) => {
    setRows(response.data.data.sales)
    setRevenue(rows.map(item => item.final_price).reduce((prev, next) => prev + next));
  });
}, [rows]);


  return (
    <Container>
      <AttachMoneyIcon color="success"  sx={{ fontSize: "3rem" }} />
      <div>
        <Typography component="p" variant="h9">
          {formatter.format(revenue)}
        </Typography>
        <Title>Revenue</Title>  
      </div>
    </Container>
  );
}
