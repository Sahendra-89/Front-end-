import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../../store/ShopContext";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { backendUrl } = useContext(ShopContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        { email }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
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
        <p className="prata-regular text-3xl">Forgot Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <p className="text-sm text-gray-500 text-center mb-4">
        Enter your registered email address securely to reset your password.
      </p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
        placeholder="Email Address"
        required
      />
      <button className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition-colors duration-300 w-full rounded-sm">
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPassword;
