import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import "./index.css"
// Import your components
import NotFound from './Components/Pages/NotFound/NotFound.jsx';
import Layout from './Layout';
import Home from './Components/Pages/Home/Home.jsx';
import About from './Components/Pages/About/About.jsx';
import Product from './Components/Pages/Product/Product.jsx';
import Contact from './Components/Pages/Contact/Contact.jsx';
import Featured from './Components/Pages/Featured/Featured.jsx';
import Loader from './Components/Loader/Loader.jsx';
import ProductDetails from './Components/Pages/ProductDetails/ProductDetails.jsx';
import LoginSignup from './Components/Pages/LoginSignup/LoginSignup.jsx';
import Account from './Components/Pages/Account/Account.jsx';
import Cart from './Components/Pages/Cart/Cart.jsx';
import ProtectedRoute from './Components/Route/ProtectedRoute.jsx';
import UpdateAccount from './Components/Pages/UpdateAccount/UpdateAccount.jsx';
import UpdatePassword from './Components/Pages/UpdatePassword/UpdatePassword.jsx';
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './Components/Pages/ResetPassword/ResetPassword.jsx';
import Shipping from './Components/Pages/Shipping/Shipping.jsx';
import ConfirmOrder from './Components/Pages/ConfirmOrder/ConfirmOrder.jsx';
import Payment from './Components/Pages/Payment/Payment.jsx';
import OrderSuccess from './Components/Pages/OrderSuccess/OrderSuccess.jsx';


import MyOrders from './Components/Pages/MyOrders/MyOrders.jsx';
import Dashboard from './Components/Pages/Dashboard/Dashboard.jsx';
import ProductList from './Components/Pages/ProductList/ProductList.jsx';
import NewProduct from './Components/Pages/NewProduct/NewProduct.jsx';
import UpdateProduct from './Components/Pages/UpdateProduct/UpdateProduct.jsx';
import OrderList from './Components/Pages/OrderList/OrderList.jsx';
import UsersList from './Components/Pages/UsersList/UsersList.jsx';
import ProductReviews from './Components/Pages/ProductReviews/ProductReviews.jsx';



const App = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const fetchStripeKey = async () => {
      try {
        const { data } = await axios.get('/api/v1/stripeapikey');
        const stripe = await loadStripe(data.stripeApiKey);
        setStripePromise(stripe);
      } catch (error) {
        console.error('Error fetching Stripe publishable key:', error);
      }
    };

    fetchStripeKey();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sad" element={<Loader />} />
        <Route path="/home" element={<Featured />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:keyword" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Protected Route */}
        <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
        <Route path="/me/update" element={<ProtectedRoute element={<UpdateAccount />} />} />
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />} />
        <Route path="/success" element={<ProtectedRoute element={<OrderSuccess />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<MyOrders />} />} />
        <Route  path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} element={<Dashboard />} />} />
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} element={<ProductList />} />} />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} element={<NewProduct />} />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} element={<UpdateProduct />} />} />
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} element={<OrderList />} />} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} element={<UsersList />} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} element={<ProductReviews />} />} />



        <Route path="/process/payment" element={
          <ProtectedRoute element={
            stripePromise ? <Elements stripe={stripePromise}><Payment /></Elements> : <Loader/>
          } />
        } />

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("i am the frontend");
root.render(<App />);
