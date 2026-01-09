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
import AdminLayout from '../pages/Admin/AdminLayout';
import AddProduct from '../pages/Admin/AddProduct';
import ListOrders from '../pages/Admin/ListOrders';
import Dashboard from '../pages/Admin/Dashboard';
import ListProducts from '../pages/Admin/ListProducts';
import Users from '../pages/Admin/Users';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add" element={<AddProduct />} />
                <Route path="list" element={<ListProducts />} />
                <Route path="orders" element={<ListOrders />} />
                <Route path="users" element={<Users />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
