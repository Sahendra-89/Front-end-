import React from "react";
import { ShopContext } from "../../store/ShopContext.jsx";
import { Link } from "react-router-dom";

const ProductsItem = ({ id, image, name, price }) => {
  const { currency = "$" } = React.useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer bg-white p-3 shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-sm border border-transparent hover:border-gray-100 flex flex-col' to={`/product/${id}`}>
      <div className='overflow-hidden h-48 flex items-center justify-center bg-white mb-3'>
        <img className='max-h-full max-w-full object-contain hover:scale-110 transition duration-500' src={image[0]} alt={name} />
      </div>
      <div>
        <p className='text-sm font-semibold truncate text-gray-800'>{name}</p>
        <div className='flex items-center gap-2 mt-2'>
          <p className='text-sm font-bold text-gray-900'>{currency}{price}</p>
          <p className='text-[10px] text-gray-400 line-through'>{currency}{Math.round(price * 1.5)}</p>
          <p className='text-[10px] text-green-600 font-bold'>33% off</p>
        </div>
        <p className='text-[11px] text-gray-500 mt-1'>Free delivery</p>
      </div>
    </Link>
  );
};

export default ProductsItem;
