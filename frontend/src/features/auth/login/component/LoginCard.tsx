import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
// import SocialLogin from "./SocialLogin";

const LoginCard = () => {
  return (
    <div className="rounded-3xl border border-white/40 bg-white/60 p-10 backdrop-blur-3xl shadow-2xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold">
          Welcome Back
        </h2>

        <p className="mt-2 text-gray-500">
          Login to Insta
        </p>
      </div>

      <LoginForm />

      <div className="mt-8 text-center text-sm">
        First time here?

        <Link 
        to={'/verify-email'}
        className="ml-2 font-semibold text-[#715857] hover:underline">
          register
        </Link>
      </div>
    </div>
  );
};

export default LoginCard;