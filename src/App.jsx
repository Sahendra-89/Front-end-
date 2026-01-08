import React from "react";
import Header from "./components/layout/Header.jsx";
import MegaMenu from "./components/layout/MegaMenu.jsx";
import SearchBar from "./components/layout/SearchBar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

import "./assets/styles/variables.css";
import "./assets/styles/global.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
      <Header />
      <MegaMenu />
      <div className="px-4 md:px-[2vw] lg:px-[4vw]">
        <SearchBar />
        <AppRoutes />
        <Footer />
      </div>
    </div>
  );
};

export default App;
