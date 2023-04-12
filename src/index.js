import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  // RouterProvider,
} from 'react-router-dom';
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

import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/product",
    element: <Global><ProductTable/></Global>,
  },
  {
    path: "/product/add",
    element: <Global><ProductAdd/></Global>,
  },
  {
    path: "/auth",
    element: <SignIn />
  },
  {
    path: "/",
    element: <Global><Dashboard/></Global>,
  },
  {
    path: "/pos",
    element: <Global><Album/></Global>
  },
  {
    path: "/size",
    element: <Global><SizeTable/></Global>
  },
  {
    path: "/size/add",
    element: <Global><SizeAdd/></Global>
  },
  {
    path: "/category",
    element: <Global><CategoryTable/></Global>
  },
  {
    path: "/category/add",
    element: <Global><CategoryAdd/></Global>
  },
  {
    path: "/stock",
    element: <Global><StockTable/></Global>
  },
  {
    path: "/stock/add",
    element: <Global><StockAdd/></Global>
  },
  {
    path: "/sale",
    element: <Global><SaleTable/></Global>
  },
  {
    path: "/sale/id",
    element: <Global><SaleSelectById/></Global>
  },
  {
    path: "/supplier",
    element: <Global><SupplierTable/></Global>
  },
  {
    path: "/supplier/add",
    element: <Global><SupplierAdd/></Global>
  },
  {
    path: "/customer",
    element: <Global><CustomerTable/></Global>
  },
  {
    path: "/customer/add",
    element: <Global><CustomerAdd/></Global>
  },

  
])
console.log(router)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
