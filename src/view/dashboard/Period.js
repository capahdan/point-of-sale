import * as React from 'react';
import Title from './Title';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';



const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '16px', // adjust the gap as needed
});

export default function Product() {
  return (
    <Container>
      <CalendarMonthIcon sx={{ fontSize: "4rem",color: green[500] }} />
        <Title>Periods</Title>  
    </Container>
  );
}
