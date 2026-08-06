
import {  useLocation } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const Register = () => {

const location = useLocation();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7f6] via-[#fdeceb] to-[#f9d8d6] p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/50 backdrop-blur-xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-[#4f4444]">
          Create Account
        </h1>

        <p className="text-center text-[#7c6d6b] mt-2 mb-8">
          Join our community today.
        </p>

       <div>
        <RegisterForm email={location.state?.email || ""}/>

       </div>
      </div>
    </div>
  );
};

export default Register;

