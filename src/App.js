import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectRoutes } from './hooks/protectRoutes';
import Global from './component/AppBar';
import ProductTable from './view/product/Table';
import SignIn from './view/signin/SignIn';
import Dashboard from './view/dashboard/Dashboard';
import Album from './view/pos/Pos';
import SizeTable from './view/size/Table';
import CategoryTable from './view/category/Table';
import CategoryAdd from './view/category/Add';
import ProductAdd from './view/product/Add';
import SizeAdd from './view/size/Add';
import StockAdd from './view/stock/Add';
import StockTable from './view/stock/Table';
import SaleTable from './view/sale/Table';
import SaleSelectById from './view/sale/Add';
import SupplierTable from './view/supplier/Table';
import SupplierAdd from './view/supplier/Add';
import CustomerTable from './view/customer/Table';
import CustomerAdd from './view/customer/Add';

const userRole= ['admin']

export default function App() {
  return (  
    <Routes>
      {/* <Route path='/' element={ <Navigate to='/' exact /> } /> */}
      <Route path='/login' element={ <SignIn /> } />

      <Route element={ <ProtectRoutes userRole={userRole} /> }>
        <Route path='/' element={ <Global><Dashboard/></Global> } />
        <Route path='/product' element={ <Global><ProductTable/></Global> } />
        <Route path='/product/add' element={ <Global><ProductAdd/></Global> } />
        <Route path='/pos' element={ <Global><Album/></Global> } />
        <Route path='/size' element={ <Global><SizeTable/></Global> } />
        <Route path='/size/add' element={ <Global><SizeAdd/></Global> } />
        <Route path='/category' element={ <Global><CategoryTable/></Global> } />
        <Route path='/category/add' element={ <Global><CategoryAdd/></Global> } />
        <Route path='/stock' element={ <Global><StockTable/></Global> } />
        <Route path='/stock/add' element={ <Global><StockAdd/></Global> } />
        <Route path='/supplier' element={ <Global><SupplierTable/></Global> } />
        <Route path='/supplier/add' element={ <Global><SupplierAdd/></Global> } />
        <Route path='/customer' element={ <Global><CustomerTable/></Global> } />
        <Route path='/customer/add' element={ <Global><CustomerAdd/></Global> } />
        <Route path='/sale' element={ <Global><SaleTable/></Global> } />
        <Route path='/sale/id' element={ <Global><SaleSelectById/></Global> } />

      </Route>
    </Routes>
  )
}
