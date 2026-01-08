import React, { useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { ShopContext } from "../../store/ShopContext";
import { assets } from "../../assets/images/assets";
import Title from "../../components/common/Title";
import ProductsItem from "../../components/ui/ProductsItem";
import axios from "../../api/axiosInstance";

const Collection = () => {
  const { products, search, showSearch, backendUrl } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(([]));
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subCategoryParam = searchParams.get('subCategory');
    if (categoryParam) setCategory(categoryParam.split(','));
    if (subCategoryParam) setSubCategory(subCategoryParam.split(','));
  }, [searchParams]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFilteredProducts = async () => {
    try {
      let params = new URLSearchParams();
      if (category.length > 0) params.append('category', category.join(','));
      if (subCategory.length > 0) params.append('subCategory', subCategory.join(','));
      if (showSearch && search) params.append('search', search);
      if (sortType !== 'relevant') params.append('sort', sortType);
      params.append('page', page);
      params.append('limit', 12);

      const response = await axios.get(`${backendUrl}/api/product/list?${params.toString()}`);
      if (response.data.success) {
        const productData = response.data.data;
        setFilterProducts(productData.products);
        setTotalPages(productData.pagination.pages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFilteredProducts();
  }, [category, subCategory, search, showSearch, sortType, page])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Men'} checked={category.includes('Men')} onChange={toggleCategory} /> Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Women'} checked={category.includes('Women')} onChange={toggleCategory} /> Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Kids'} checked={category.includes('Kids')} onChange={toggleCategory} /> Kids
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Beauty'} checked={category.includes('Beauty')} onChange={toggleCategory} /> Beauty
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Food'} checked={category.includes('Food')} onChange={toggleCategory} /> Food
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Toys'} checked={category.includes('Toys')} onChange={toggleCategory} /> Toys
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Mobiles'} checked={category.includes('Mobiles')} onChange={toggleCategory} /> Mobiles
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Fashion'} checked={category.includes('Fashion')} onChange={toggleCategory} /> Fashion
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Topwear'} checked={subCategory.includes('Topwear')} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bottomwear'} checked={subCategory.includes('Bottomwear')} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Winterwear'} checked={subCategory.includes('Winterwear')} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductsItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className='flex justify-center gap-2 mt-10'>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`border px-3 py-1 ${page === i + 1 ? 'bg-black text-white' : 'bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
