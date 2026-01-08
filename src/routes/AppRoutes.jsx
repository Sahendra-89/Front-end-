import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Collection from '../pages/Collection/Collection';
import Login from '../pages/Auth/Login';
import About from '../pages/About/About';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import PlaceOrder from '../pages/Orders/PlaceOrder';
import Contact from '../pages/Contact/Contact';
import Cart from '../pages/Cart/Cart';
import Orders from '../pages/Orders/Order';
import Verify from '../pages/Orders/Verify';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Collection" element={<Collection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/About" element={<About />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/placeOrder" element={<PlaceOrder />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
    );
};

export default AppRoutes;
