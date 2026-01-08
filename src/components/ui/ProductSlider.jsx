import React, { useContext } from 'react'
import { ShopContext } from '../../store/ShopContext'
import ProductsItem from './ProductsItem'
import { assets } from '../../assets/images/assets'

const ProductSlider = ({ title, products, link }) => {

    const { navigate } = useContext(ShopContext);

    const scrollLeft = () => {
        const slider = document.getElementById('slider-' + title.replace(/\s+/g, ''));
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const scrollRight = () => {
        const slider = document.getElementById('slider-' + title.replace(/\s+/g, ''));
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <div className='bg-white my-4 shadow-sm border p-4 relative overflow-hidden'>
            <div className='flex justify-between items-center mb-4 px-2'>
                <div>
                    <h2 className='text-lg font-bold text-black'>{title}</h2>
                    <p className='text-gray-400 text-xs'>Greatest Deals of the Season</p>
                </div>
                <button onClick={() => navigate(link || '/collection')} className='bg-[#2874f0] hover:bg-blue-700 transition-colors text-white text-xs px-5 py-2.5 font-bold rounded-sm shadow-sm'>VIEW ALL</button>
            </div>
            <hr className='mb-4 opacity-50' />

            {/* Slider Container */}
            <div className='relative group'>
                {/* Left Button */}
                <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-2xl h-24 w-10 hidden group-hover:flex items-center justify-center rounded-r-md border border-gray-100"><img src={assets.dropdown_icon} className='rotate-90 w-4' alt="Left" /></button>

                {/* Scrollable Area */}
                <div id={'slider-' + title.replace(/\s+/g, '')} className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 pb-6'>
                    {products.map((item, index) => (
                        <div key={index} className='min-w-[180px] sm:min-w-[220px] bg-white border border-transparent hover:border-gray-100 hover:shadow-xl p-4 transition-all duration-300 cursor-pointer rounded-sm flex flex-col items-center' onClick={() => navigate(`/product/${item._id}`)}>
                            <div className='w-full h-44 flex items-center justify-center mb-4 overflow-hidden'>
                                <img src={item.image[0]} className='max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500' alt={item.name} />
                            </div>
                            <div className='text-center w-full'>
                                <p className='text-sm font-semibold text-gray-800 truncate mb-1'>{item.name}</p>
                                <p className='text-green-600 text-sm font-bold'>From ${item.price}</p>
                                <p className='text-gray-500 text-xs mt-1'>{item.category}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Button */}
                <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-2xl h-24 w-10 hidden group-hover:flex items-center justify-center rounded-l-md border border-gray-100"><img src={assets.dropdown_icon} className='-rotate-90 w-4' alt="Right" /></button>
            </div>
        </div>
    )
}

export default ProductSlider
