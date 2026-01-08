import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../../store/ShopContext";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { backendUrl } = useContext(ShopContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/user/reset-password`,
                { token, newPassword }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-8 rounded-lg shadow-md border border-gray-100"
        >
            <div className="inline-flex items-center gap-2 mb-2 mt-5">
                <p className="prata-regular text-3xl">Reset Password</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>
            <p className="text-sm text-gray-500 text-center mb-4">
                Enter your new password below.
            </p>
            <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                placeholder="New Password"
                required
            />
            <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                placeholder="Confirm Password"
                required
            />
            <button className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition-colors duration-300 w-full rounded-sm">
                Reset Password
            </button>
        </form>
    );
};

export default ResetPassword;
