import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import DatasetIcon from '@mui/icons-material/Dataset';
import Link from '@mui/material/Link';


export const mainListItems = (
<React.Fragment>
    <Link href="/"
    sx={{textDecoration:'none', color:'inherit'}}> 
      <ListItemButton sx={{backgroundColor: window.location.pathname==='/'?'rgba(25, 118, 210, 0.7)':'none'}}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link href="/pos" sx={{textDecoration:'none', color:'inherit'}}> 
      <ListItemButton sx={{backgroundColor: window.location.pathname==='/pos'?'rgba(25, 118, 210, 0.7)':'none'}}>
        <ListItemIcon>
          <PointOfSaleIcon />
        </ListItemIcon>
        <ListItemText primary="POS" />
      </ListItemButton>
    </Link>
    <Link href="/supplier" sx={{textDecoration:'none', color:'inherit'}}> 
      <ListItemButton sx={{backgroundColor: /^\/supplier($|\/)/.test(window.location.pathname) ?'rgba(25, 118, 210, 0.7)':'none'}}>
        <ListItemIcon>
          <ShoppingBasketIcon />
        </ListItemIcon>
        <ListItemText primary="Supplier" />
      </ListItemButton>
    </Link>
    <Link href="/customer" sx={{textDecoration:'none', color:'inherit'}}> 
      <ListItemButton sx={{backgroundColor: /^\/customer($|\/)/.test(window.location.pathname)?'rgba(25, 118, 210, 0.7)':'none'}}>
        <ListItemIcon>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
    </Link>
    <Link href="/sale" sx={{textDecoration:'none', color:'inherit'}}> 
      <ListItemButton sx={{backgroundColor: window.location.pathname==='/sale'?'rgba(25, 118, 210, 0.7)':'none'}}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Sale" />
      </ListItemButton>
    </Link>
    <Link href="/stock" sx={{textDecoration:'none', color:'inherit'}}> 
      <ListItemButton sx={{backgroundColor: /^\/stock($|\/)/.test(window.location.pathname)?'rgba(25, 118, 210, 0.7)':'none'}}>
        <ListItemIcon>
          <Inventory2Icon />
        </ListItemIcon>
        <ListItemText primary="Stock" />
      </ListItemButton>
    </Link>
    <Link href="/user" sx={{textDecoration:'none', color:'inherit'}}> 
      <ListItemButton sx={{backgroundColor: /^\/user($|\/)/.test(window.location.pathname)?'rgba(25, 118, 210, 0.7)':'none'}}>
        <ListItemIcon>
          <PersonIcon/>
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);


export default function SecondaryListItems(){

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
        <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DatasetIcon />
        </ListItemIcon>
        <ListItemText primary="Product Section" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/product" sx={{textDecoration:'none', color:'inherit'}}>
            <ListItemButton sx={{ pl: 4, backgroundColor: /^\/product($|\/)/.test(window.location.pathname)?'rgba(25, 118, 210, 0.7)':'none'}}>
              <ListItemIcon>
                <DatasetIcon />
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItemButton>
          </Link>
          <Link href="/category" sx={{textDecoration:'none', color:'inherit'}}> 
            <ListItemButton sx={{ pl: 4, backgroundColor: /^\/category($|\/)/.test(window.location.pathname)?'rgba(25, 118, 210, 0.7)':'none' }}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItemButton>
          </Link>
          <Link href="/size" sx={{textDecoration:'none', color:'inherit'}}> 
            <ListItemButton sx={{ pl: 4, backgroundColor: /^\/size($|\/)/.test(window.location.pathname)?'rgba(25, 118, 210, 0.7)':'none' }}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Size" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
   </React.Fragment>
  )
  
} 