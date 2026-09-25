import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PasswordField from "../../../component/ui/input/PasswordInput";
import Button from "../../../component/ui/button/Button";
import { useResetPasswordMutation } from "../services/forgetPassword.feature";
import { toast } from "react-hot-toast";

const ForgetPasswordPage = () => {
  const location = useLocation();
  const token = location.state?.token;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [resetPassword, { isLoading: reseting }] = useResetPasswordMutation();
  const navigate = useNavigate();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      const args = {
        password: data.password,
        email: location.state.email,
        token: token,
      };
      const res = await resetPassword(args).unwrap();
      console.log(res);
      toast.success("password reset success");
      navigate("/login");
      return;
    } catch (error) {
      console.log("there is an error in the forgetPassword page", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br
     from-[#fdf5f5] via-[#fbeaea] to-[#f8dede] px-4"
    >
      <div
        className="w-full max-w-md rounded-3xl border border-white/60
        bg-white/40 backdrop-blur-xl shadow-2xl p-8"
      >
        <div className="mb-8 text-center">
          {/* <div
            className="mx-auto flex h-20 w-20 items-center justify-center
            rounded-full bg-[#f3b8b4]/30 border border-[#f3b8b4]"
          >
            <span className="text-4xl">🔒</span>
          </div> */}

          <h1 className="mt-5 text-3xl font-bold text-[#4f4444]">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-[#7c6d6b]">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <PasswordField
            label="New Password"
            placeholder="Enter new password"
            {...register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />

          <PasswordField
            label="Confirm Password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            children={reseting ? "resting..." : "reset"}
            className="w-full cursor-pointer py-3 font-semibold
            text-[#4f4444] transition hover:scale-[0.98] hover:shadow-lg"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
