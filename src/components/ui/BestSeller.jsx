import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../store/ShopContext";
import ProductSlider from "./ProductSlider";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller);
    setBestSeller(bestProduct.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <ProductSlider title="Best Sellers" products={bestSeller} link="/collection" />
    </div>
  );
};

export default BestSeller;
