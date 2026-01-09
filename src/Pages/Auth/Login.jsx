import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../store/ShopContext";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }
        const response = await axiosInstance.post("/api/user/register", {
          firstName,
          lastName,
          email,
          password,
          aadharCard,
        });
        if (response.data.success) {
          setToken(response.data.data.token);
          localStorage.setItem("token", response.data.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axiosInstance.post("/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.data.token);
          localStorage.setItem("token", response.data.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-8 rounded-lg shadow-md border border-gray-100"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-5">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <div className="w-full flex gap-4">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#2874f0] transition-colors"
            placeholder="First Name"
            required
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#2874f0] transition-colors"
            placeholder="Second Name"
            required
          />
        </div>
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#2874f0] transition-colors"
        placeholder="Email"
        required
      />

      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setAadharCard(e.target.value)}
          value={aadharCard}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#2874f0] transition-colors"
          placeholder="Aadhar Card"
          required
        />
      )}

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#2874f0] transition-colors"
        placeholder="Password"
        required
      />

      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#2874f0] transition-colors"
          placeholder="Confirm Password"
          required
        />
      )}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:text-[#2874f0] text-gray-600">
          Forgot your password?
        </p>
        <p
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
          className="cursor-pointer hover:text-[#2874f0] text-gray-600 font-medium"
        >
          {currentState === "Login" ? "Create account" : "Login Here"}
        </p>
      </div>
      <button className="bg-[#2874f0] text-white font-bold px-8 py-2 mt-4 hover:bg-blue-700 transition-colors duration-300 w-full rounded-sm shadow-md">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
      {currentState === "Login" ? (
        <div className="flex justify-between w-full mt-2 text-xs">
          <p className="text-gray-500 cursor-pointer">
            New here?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Create an account
            </span>
          </p>
          <p
            onClick={() => navigate("/forgot-password")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
        </div>
      ) : (
        <div className="w-full mt-2 text-xs text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-blue-600 font-semibold hover:underline ml-1 cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      )}
    </form>
  );
};

export default Login;
