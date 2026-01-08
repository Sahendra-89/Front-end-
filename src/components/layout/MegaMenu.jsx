import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/images/assets';

const SubNavbar = () => {
    const navigate = useNavigate();
    const categories = [
        { name: 'Mobiles', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png', slug: 'Mobiles' },
        { name: 'Fashion', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png', slug: 'Fashion' },
        { name: 'Electronics', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/69cff050908f6e14.png', slug: 'Electronics' },
        { name: 'Home', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/ee1125dc639234b6.png', slug: 'Home' },
        { name: 'Appliances', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff097d12f32310b.png', slug: 'Appliances' },
        { name: 'Travel', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56bbed6.png', slug: 'Travel' },
        { name: 'Beauty, Toys & More', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png', slug: 'Beauty,Toys,Food' },
        { name: 'Two Wheelers', icon: 'https://rukminim1.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png', slug: 'Automotive' },
    ];

    const handleCategoryClick = (slug) => {
        navigate(`/collection?category=${slug}`);
    };

    return (
        <div className='bg-white shadow-sm border-b'>
            <div className='max-w-[1248px] mx-auto flex justify-between items-center py-3 px-4 overflow-x-auto scrollbar-hide gap-8 sm:gap-4'>
                {categories.map((item, index) => (
                    <div onClick={() => handleCategoryClick(item.slug)} key={index} className='flex flex-col items-center cursor-pointer group min-w-[70px] sm:min-w-fit'>
                        <img src={item.icon} alt={item.name} className='w-12 h-12 sm:w-16 sm:h-16 object-contain mb-1 group-hover:scale-105 transition-transform duration-200' />
                        <p className='text-[10px] sm:text-xs font-bold text-gray-800 group-hover:text-[#2874f0] whitespace-nowrap'>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubNavbar;
