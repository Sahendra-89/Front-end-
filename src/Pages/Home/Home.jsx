import React, { useContext, useEffect, useState } from "react";
import Hero from "../../components/ui/Hero";
import ProductSlider from "../../components/ui/ProductSlider";
import { ShopContext } from "../../store/ShopContext";

const Home = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    setBestSeller(products.filter((item) => item.bestseller).slice(0, 10));
  }, [products]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Hero />
      <ProductSlider title="Best of Electronics" products={latestProducts} link='/collection' />
      <ProductSlider title="Beauty, Food, Toys & more" products={bestSeller} link='/collection' />
      <ProductSlider title="Shop for a Cool Summer" products={latestProducts.reverse()} link='/collection' />
    </div>
  );
};

export default Home;
