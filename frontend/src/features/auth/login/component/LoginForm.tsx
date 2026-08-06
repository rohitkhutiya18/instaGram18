import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loginFormSchema,
  type loginFormType,
} from "../../../../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../../services/auth.feature";
import Input from "../../../../component/ui/input/Input";
import PasswordField from "../../../../component/ui/input/PasswordInput";
import Button from "../../../../component/ui/button/Button";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../../store/slice/userSlice";

const LoginForm = () => {
  const location = useLocation();
  const [requestLoginUser, { isLoading: isLoginRequesting }] =
    useLoginUserMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: location.state?.email || "",
      password: location.state?.password || "",
    },
  });

  const onSubmit = async (data: loginFormType) => {
    try {
      const res = await requestLoginUser({ data }).unwrap();

      if (res.accessToken) {
        window.sessionStorage.setItem("accessToken", res.accessToken);
      }
      dispatch(setUserData(res));
      navigate("/");
    } catch (error) {
      console.log("there is an error in the loginForm", error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[4px] text-gray-500">
          Identity
        </label>

        <div className="relative">
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="xyz@example.com"
            label="Email"
            error={errors.email ? errors.email.message : ""}
          />
        </div>
      </div>

      <div>
        <div className="relative">
          <PasswordField
            placeholder="enter password"
            label="Password"
            {...register("password")}
            error={errors.password ? errors.password.message : ""}
          />
          <Link
            to="/verify-email-forget-password"
            className="my-2 block text-xs uppercase tracking-[2px] text-[var(--text-primary)] "
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <Button
        className="w-full cursor-pointer"
        children={isLoginRequesting ? "loging" : "login"}
      />
    </form>
  );
};

export default LoginForm;
