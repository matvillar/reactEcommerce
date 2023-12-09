import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPaymentPage from './pages/OrderPaymentPage';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Profile from './pages/Profile';
import AdminRoute from './components/AdminRoute';
import OrderListPage from './pages/OrderListPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />}></Route>
      <Route path="/page/:pageNumber" element={<Home />}></Route>
      <Route path="/product/:id" element={<ProductPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />}></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/placeorder" element={<PlaceOrderPage />}></Route>
        <Route path="/order/:id" element={<OrderPaymentPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />}></Route>
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
