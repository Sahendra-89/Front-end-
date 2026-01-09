import React, { useEffect, useState } from 'react'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import { useOutletContext } from 'react-router-dom'

const Dashboard = () => {

    const { currency, token } = useOutletContext();
    const [stats, setStats] = useState(null)

    const loadStats = async () => {
        try {
            const response = await axios.get('/api/order/dashboard', { headers: { token } })
            if (response.data.success) {
                setStats(response.data.data)
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
            loadStats()
        }
    }, [token])

    if (!stats) {
        return <div className='p-6'>Loading Dashboard...</div>
    }

    return (
        <div className='w-full p-4'>
            <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <div className='bg-white p-6 rounded-lg shadow-md border hover:border-gray-400 transition-colors'>
                    <p className='text-gray-500 text-sm font-medium'>Total Sales</p>
                    <p className='text-3xl font-bold mt-2'>{currency}{stats.totalRevenue}</p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md border hover:border-gray-400 transition-colors'>
                    <p className='text-gray-500 text-sm font-medium'>Total Orders</p>
                    <p className='text-3xl font-bold mt-2'>{stats.totalOrders}</p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md border hover:border-gray-400 transition-colors'>
                    <p className='text-gray-500 text-sm font-medium'>Total Users</p>
                    <p className='text-3xl font-bold mt-2'>{stats.totalUsers}</p>
                </div>
            </div>

            {/* Recent Orders */}
            <h2 className='text-xl font-bold mb-4'>Recent Orders</h2>
            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='grid grid-cols-5 bg-gray-100 p-3 text-sm font-medium border-b'>
                    <div>Order ID</div>
                    <div>Date</div>
                    <div>Customer</div>
                    <div>Status</div>
                    <div>Amount</div>
                </div>
                {stats.latestOrders.map((order, index) => (
                    <div key={index} className='grid grid-cols-5 p-3 text-sm border-b hover:bg-gray-50 items-center'>
                        <div className='truncate pr-2' title={order._id}>{order._id}</div>
                        <div>{new Date(order.date).toLocaleDateString()}</div>
                        <div className='truncate pr-2'>{order.address.firstName} {order.address.lastName}</div>
                        <div>
                            <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Order Placed' ? 'bg-blue-100 text-blue-800' :
                                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        'bg-yellow-100 text-yellow-800'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                        <div>{currency}{order.amount}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
