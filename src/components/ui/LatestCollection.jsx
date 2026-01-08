import React, { useContext, useEffect, useState } from "react";
//import { use, useState } from "react";
import { ShopContext } from "../../store/ShopContext.jsx";
import Title from "../common/Title.jsx";
import ProductsItem from "./ProductsItem.jsx";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    // Fetch or compute latest products here
    setLatestProducts(products.slice(0, 10)); // Example: taking first 10 products as latest
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa modi
          dolores, quaerat fuga, odio minus consequatur similique fugit quo
          error explicabo? Reprehenderit, fugit ex. Repellendus ad reprehenderit
          eligendi deserunt dolorum.
        </p>
      </div>

      {/*rendring products*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {latestProducts.map((item, index) => (
          <ProductsItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
