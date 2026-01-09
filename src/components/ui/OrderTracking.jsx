import React from 'react'

const OrderTracking = ({ status }) => {
    const steps = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];
    const currentStep = steps.indexOf(status);

    return (
        <div className='w-full py-6 px-4'>
            <div className='flex items-center justify-between relative'>
                {/* Progress Bar Background */}
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10'></div>

                {/* Active Progress Bar */}
                <div
                    className='absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 -z-10 transition-all duration-500'
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => (
                    <div key={index} className='flex flex-col items-center'>
                        <div className={`w-4 h-4 rounded-full border-2 ${index <= currentStep ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'} z-10 transition-colors duration-300`}></div>
                        <p className={`text-xs mt-2 ${index <= currentStep ? 'text-black font-medium' : 'text-gray-400'}`}>{step}</p>
                    </div>
                ))}
            </div>
            {status === 'Cancelled' && <p className='text-red-500 text-center font-bold mt-4'>Order Cancelled</p>}
        </div>
    )
}

export default OrderTracking
