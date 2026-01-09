import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/layout/AdminNavbar'
import Sidebar from '../../components/layout/Sidebar' // Will create this next
import { Outlet, useNavigate } from 'react-router-dom'
import AdminLogin from './AdminLogin'

const AdminLayout = () => {

    const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            // If no token, maybe we are at /admin/login, handled by logic below
        }
    }, [token])

    if (token === "") {
        return <AdminLogin setToken={setToken} />
    }

    return (
        <div className='bg-gray-50 min-h-screen'>
            <AdminNavbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                    <Outlet context={{ token }} />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
