import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';


export default function Album() {
  const[products, setProducts]= useState([])
  const [cart, setCart]= useState([])
  const [discount]= useState(0)
  let total_price= cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
  let final_price = total_price - discount
  let [cash, setCash] = useState(0)
  let [remaining, setRemaining] = useState(0)
  const [note] = useState('')
  const [user_id]= useState(1)   
  remaining = cash - total_price;
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const [successAlert, setSuccessAlert] = useState(false);
  const [customer ,setCustomer]= useState('')
  const [customers, setCustomers]=useState([])


  React.useEffect(()=> {
    axios.get('http://localhost:5001/v1/product?page=1&limit=20').then((response) => {
      setProducts(response.data.data.products)
    });

    axios.get('http://localhost:5001/v1/customer?page=1&limit=20').then((response) => {
      setCustomers(response.data.data.customers)
    });
  }, [])

  const HandlePrint = () => {

    const modal = document.getElementById('modal');
    modal.classList.remove('modal');
    window.print();
    modal.classList.add('modal');
    handleClose()
    setCart([])
    setCash(0)
    setRemaining(0)
    total_price=0
    setCustomer()
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 3000);

  }

  const HandleSubmit = async e=>{
    e.preventDefault();    
    try{
      const items = cart.map(({name,price,image,...attr})=> attr)
      const payload = {
        total_price,
        discount,
        final_price,
        cash,
        remaining,
        note,
        user_id,
        customer_id: parseInt(customer),
        items
      }

        await axios.post('http://localhost:5001/v1/sale',payload)
        .then((response)=> {
          
          console.log(response)
        })
      } 
      catch(error){
        console.log(error)
        alert(error)
      }
  }

  const handleBuy = (e,product) => {
    e.preventDefault();
    const index = cart.find((c) => c.product_id === product.id)
    if(index === undefined){
      setCart([...cart,{product_id:product.id,name:product.name,
                        quantity:1,price:product.price, image:product.image}])
    }else {
          cart.find((c) => {
            if(c.product_id === product.id){
              c.quantity++
              console.log(cart)
              return true
            }
            return false
        })
      setCart([...cart])
    }
  }

  const handlePlus = (e, ct) => {
    e.preventDefault()
    ct.quantity++
    setCart([...cart])
  }

  const handleMinus = (e, ct) => {
    e.preventDefault()
    ct.quantity--
    if(ct.quantity <= 0){
      const index = cart.findIndex((c)=> c.product_id === ct.product_id)
      cart.splice(index, 1)
    }
    setCart([...cart])
  }

  const handleCash = (e, ch) => {
    e.preventDefault()
    cash += ch
    setCash(cash)
  }
  // Modal



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  return (
      <main style={{display:'flex', flexDirection:'row',marginTop:'0.5rem'}}>
        <Container sx={{
          width:'70%'
        }}>
          {successAlert && (
        <Alert severity="success" onClose={() => setSuccessAlert(false)} sx={{marginBottom:'1rem'}}>
          Sukses ! Data berhasil di-post.
        </Alert>
           )}
         {/* End hero unit */}
         
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
              <div id="modal">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 225 }} aria-label="spanning table">
                      <TableHead>
                        <TableRow >
                          <TableCell sx={{p:0}} colSpan={4} align="right">
                          {moment(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSZ').format('DD MMMM YYYY, HH:mm:ss')}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            <b>SHINE SHOP </b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" colSpan={3}>
                            Details Sale
                          </TableCell>
                          <TableCell  align="right">Price</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Name Of Product</TableCell>
                          <TableCell align="right">Qty.</TableCell>
                          <TableCell align="right">Unit</TableCell>
                          <TableCell align="right">Sum</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.map((row) => (
                          <TableRow key={row.desc}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{formatter.format(row.price).replace(',00','')}</TableCell>
                            <TableCell align="right">{formatter.format(row.price * row.quantity).replace(',00','')}</TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell colSpan={2}>Subtotal</TableCell>
                          <TableCell align="right">{formatter.format(total_price).replace(',00','')}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Discount</TableCell>
                          <TableCell align="right">{discount}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell align="right">{formatter.format(final_price).replace(',00','')}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
              </TableContainer>
             </div>
               <Button onClick={HandlePrint} sx={{ width:'100%', marginTop:'1rem'}} variant="contained" endIcon={<PrintIcon />}> Print</Button>
              </Box>
            </Fade>
          </Modal>
        

          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} >
                <Box sx={{ cursor: 'pointer' }}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' ,'&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Add a hover effect
                    },}}
                    onClick={(event)=>handleBuy(event,product)}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        pt: '0',
                      }}
                      image={`http://localhost:5001/image/${product.image}`}
                      alt="random"
                    />
                    <CardContent sx={{
                      display:'flex', flexDirection:'row',justifyContent:'space-between', paddingInline:0.4
                    }}>
                      <Typography>
                        {product.name}
                      </Typography>
                      <Typography sx={{fontSize:'1rem'}}>
                        {formatter.format(product.price)}
                      </Typography>
                    </CardContent>
                  </Card>
                  </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container sx={{width:'30%'}}>
            <Paper elevation={4}
                  sx={{
                    p:1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 550
                  }}
                >
              <Paper elevation={4}
                  sx={{
                    p: 1,
                    marginInline:0,
                    height: 250
                  }}
              >
                { cart.map((ct)=>(
                  
                  <div style={{display:'flex',marginTop:'0.25rem',justifyContent:'space-between'}}>
                      <div style={{display:'flex'}}>
                        <img style={{width:'2.5rem',height:'2.5rem', marginRight:'0.25rem '}} src={`http://localhost:5001/image/${ct.image}`}
                        alt="gambar"/>
                        <div>                        
                          <Typography>
                            {ct.name}
                          </Typography>
                          <Typography>
                            {formatter.format(ct.price)}
                          </Typography>
                        </div>
                      </div>
                      <div>
                        <IconButton aria-label="Add items" onClick={(e)=> handlePlus(e, ct)}>
                          <AddIcon />
                        </IconButton>                       
                        {ct.quantity} 
                        <IconButton aria-label="Delete items" onClick={(e)=> handleMinus(e, ct)}>
                          <RemoveIcon />
                        </IconButton>                       
                      </div>
                  </div>

                  ))
                }

              </Paper>
              <Paper elevation={4}
                  sx={{
                    p: 1,
                    marginInline:0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300
                  }}
                >
                  <form onSubmit={HandleSubmit}>
                      <FormControl fullWidth size="small" sx={{display:'flex', justifyContent:'space-between'}}>
                        <InputLabel id="demo-simple-select-label" >Customer</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={customer}
                          label="Customer"
                          onChange={(e) => setCustomer(e.target.value)}
                          >
                          {customers.map((cs) => {
                            return (
                              <MenuItem value={cs.id}>{cs.name}</MenuItem>
                              )
                            } 
                          )}
                        </Select>
                      </FormControl>
                      <Typography sx={{display:'flex', justifyContent:'space-between'}}>
                        <div>
                          Total
                        </div>
                        <div style={{marginRight:'0.5rem'}}>
                        {/* {cart.reduce((acc, item) => acc + item.quantity * item.price, 0)} */}
                        {formatter.format(total_price)}
                        </div>
                      </Typography>
                      <Divider/>
                      <Typography sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                          Cash
                        </div>
                        <TextField  
                        value={formatter.format(cash)}
                        size="small"
                        sx={{width:'50%'}}
                        inputProps={{style: { textAlign: 'right', paddingRight :'8px'}}}
                        onChange={(e) => setCash(e.target.value)} />
                      </Typography>

                      <div style={{display:'flex', justifyContent:'space-between', marginTop:'0.25rem'}}>
                        <Button variant="contained" sx={{ width:'5rem',marginBottom:'0.5rem'}} onClick={(e)=>handleCash(e,2000)}>2.000</Button>
                        <Button variant="contained" sx={{ width:'5rem',marginBottom:'0.5rem'}} onClick={(e)=>handleCash(e,5000)}>5.000</Button>
                        <Button variant="contained" sx={{ width:'5rem',marginBottom:'0.5rem'}} onClick={(e)=>handleCash(e,10000)}>10.000</Button>
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button variant="contained" sx={{ width:'5rem',marginBottom:'0.5rem'}} onClick={(e)=>handleCash(e,20000)}>20.000</Button>
                        <Button variant="contained" sx={{ width:'5rem',marginBottom:'0.5rem'}} onClick={(e)=>handleCash(e,50000)}>50.000</Button>
                        <Button variant="contained" sx={{ width:'5rem',marginBottom:'0.5rem'}} onClick={(e)=>handleCash(e,100000)}>100.000</Button>
                      </div>
                      <Divider/>
                      <Typography sx={{display:'flex', justifyContent:'space-between'}}>
                            <div>
                              Change 
                            </div>
                            <div>
                              {formatter.format(remaining)}
                            </div>
                      </Typography>
                      <Button type="submit" onClick={handleOpen} sx={{ width:'100%', marginTop:'1rem'}} variant="contained" endIcon={<SendIcon />}>  Proceed</Button>
                </form>
                </Paper>
              </Paper>
        </Container>
      </main>
  );
}
