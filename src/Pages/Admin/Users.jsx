import React, { useEffect, useState } from 'react'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import { useOutletContext } from 'react-router-dom'

const Users = () => {

    const { token } = useOutletContext();
    const [users, setUsers] = useState([])

    const loadUsers = async () => {
        try {
            const response = await axios.post('/api/user/all', {}, { headers: { token } })
            if (response.data.success) {
                setUsers(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadUsers()
        }
    }, [token])

    return (
        <div className='w-full p-4'>
            <h1 className='text-2xl font-bold mb-6'>Users Management</h1>
            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='grid grid-cols-[2fr_3fr_1fr] md:grid-cols-[2fr_3fr_1fr_2fr] bg-gray-100 p-3 text-sm font-medium border-b'>
                    <div>Name</div>
                    <div>Email</div>
                    <div className='hidden md:block'>Joined Date</div>
                    <div className='text-right'>Action</div>
                </div>
                {users.map((user, index) => (
                    <div key={index} className='grid grid-cols-[2fr_3fr_1fr] md:grid-cols-[2fr_3fr_1fr_2fr] p-3 text-sm border-b hover:bg-gray-50 items-center'>
                        <div className='font-medium'>{user.name}</div>
                        <div className='truncate'>{user.email}</div>
                        <div className='hidden md:block text-gray-500'>
                            {/*  {new Date(user.createdAt).toLocaleDateString()}  Assuming createdAt exists */}
                            N/A
                        </div>
                        <div className='text-right'>
                            <button className='text-red-500 hover:text-red-700 text-xs border border-red-200 bg-red-50 px-2 py-1 rounded'>Remove</button>
                        </div>
                    </div>
                ))}
                {users.length === 0 && <p className='p-4 text-center text-gray-500'>No users found.</p>}
            </div>
        </div>
    )
}

export default Users
