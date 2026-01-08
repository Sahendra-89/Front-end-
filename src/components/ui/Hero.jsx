import React from "react";
import { assets } from "../../assets/images/assets";

const Hero = () => {

  const sliderImages = [assets.hero_img, assets.hero_img, assets.hero_img]; // Demo images
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }

  // Auto slide
  React.useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full h-[200px] sm:h-[300px] bg-white overflow-hidden my-2 shadow-sm'>
      <div className='flex transition-transform duration-700 ease-in-out h-full' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {sliderImages.map((img, index) => (
          <div key={index} className='min-w-full h-full flex items-center justify-center'>
            <div className={`w-full h-full flex items-center justify-between px-6 sm:px-20 text-white ${index % 2 === 0 ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'bg-gradient-to-r from-purple-600 to-pink-500'}`}>
              <div className='space-y-4 max-w-[50%]'>
                <div className='overflow-hidden'>
                  <p className='font-medium text-xs sm:text-base uppercase tracking-widest animate-reveal'>Special Offer</p>
                </div>
                <h1 className='text-2xl sm:text-5xl font-extrabold leading-tight'>
                  {index === 0 ? "Big Billion Days Are Back!" : index === 1 ? "Up to 80% Off on Brands" : "New Season Arrivals"}
                </h1>
                <button className='bg-white text-blue-600 px-6 py-2 rounded-sm font-bold text-sm hover:bg-gray-100 transition-all'>Shop Now</button>
              </div>
              <div className='h-full flex items-center justify-center p-4'>
                <img src={img} className='h-[90%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500' alt="Hero" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button onClick={prevSlide} className='absolute top-1/2 left-0 -translate-y-1/2 bg-white/30 hover:bg-white/80 transition-colors p-3 h-20 rounded-r-md z-10'>
        <img src={assets.dropdown_icon} className='rotate-90 w-4 grayscale brightness-0' alt="Prev" />
      </button>
      <button onClick={nextSlide} className='absolute top-1/2 right-0 -translate-y-1/2 bg-white/30 hover:bg-white/80 transition-colors p-3 h-20 rounded-l-md z-10'>
        <img src={assets.dropdown_icon} className='-rotate-90 w-4 grayscale brightness-0' alt="Next" />
      </button>

      {/* Indicators */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
        {sliderImages.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
