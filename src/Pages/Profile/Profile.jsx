import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../store/ShopContext'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import Title from '../../components/common/Title'

const Profile = () => {
    const { token, navigate } = useContext(ShopContext)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return;
        }
        fetchuserProfile()
    }, [token])

    const fetchuserProfile = async () => {
        try {
            const response = await axios.get('/api/user/profile')
            if (response.data.success) {
                setUserData(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            if (error.message === 'Network Error') {
                toast.error('Unable to connect to server. Is the Backend running?')
            } else {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl mb-3'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            {userData ? (
                <div className='flex flex-col gap-4 w-full sm:max-w-[480px] m-auto mt-14 py-8 px-6 bg-white shadow-lg rounded-lg text-gray-600'>
                    <div className='text-center mb-6'>
                        <div className='w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-gray-500'>
                            {userData.firstName ? userData.firstName[0].toUpperCase() : 'U'}
                        </div>
                        <h2 className='text-2xl font-semibold mt-4 text-gray-800'>{userData.firstName} {userData.lastName}</h2>
                        <p className='text-sm text-gray-500'>{userData.email}</p>
                    </div>

                    <div className='flex flex-col gap-4 border-t pt-4'>
                        <div className='flex justify-between items-center py-2 border-b'>
                            <span className='font-medium text-gray-700'>First Name:</span>
                            <span>{userData.firstName}</span>
                        </div>
                        <div className='flex justify-between items-center py-2 border-b'>
                            <span className='font-medium text-gray-700'>Last Name:</span>
                            <span>{userData.lastName}</span>
                        </div>
                        <div className='flex justify-between items-center py-2 border-b'>
                            <span className='font-medium text-gray-700'>Email:</span>
                            <span>{userData.email}</span>
                        </div>
                        {userData.aadharCard && (
                            <div className='flex justify-between items-center py-2 border-b'>
                                <span className='font-medium text-gray-700'>Aadhar Card:</span>
                                <span>{userData.aadharCard}</span>
                            </div>
                        )}
                        <div className='flex justify-between items-center py-2 border-b'>
                            <span className='font-medium text-gray-700'>Account Type:</span>
                            <span className='capitalize'>{userData.role}</span>
                        </div>
                    </div>

                    <button className='bg-black text-white px-8 py-2 mt-4 rounded-sm hover:bg-gray-800 transition-colors w-full'>
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div className='text-center py-10'>Loading...</div>
            )}
        </div>
    )
}

export default Profile
