import { useForm } from "react-hook-form";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  verifyEmailSchema,
  type verifyEmailFromType,
} from "../../../schema/verifyEmailSchema";
import Input from "../../../component/ui/input/Input";
import Button from "../../../component/ui/button/Button";
import {
  useLazyGetForgetOTPQuery,
  useVerifyOTPForgetPasswordMutation,
} from "../services/forgetPassword.feature";

const EmailVerificationFormForPassword = () => {
  const [requestOTPForgetPassword, { isLoading: requestingOTP }] =
    useLazyGetForgetOTPQuery();

  const navigate = useNavigate();
  const [requestVerifyOTPForgetPassword, { isLoading: verifiyingOTP }] =
    useVerifyOTPForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<verifyEmailFromType>({
    resolver: zodResolver(verifyEmailSchema),
  });
  const [showOtpInputBox, setShowOtpInputBox] = useState<boolean>(false);

  const handleGetOTP = async (data: verifyEmailFromType) => {
    try {
      if (data.email && !data.otp) {
        const email = data.email;

        await requestOTPForgetPassword(email).unwrap();
        setShowOtpInputBox(true);
        return;
      }

      const res = await requestVerifyOTPForgetPassword(data).unwrap();
      console.log(res);
      navigate("/forget-password", {
        state: { token: res.resetToken, email: data.email },
      });
    } catch (error) {
      console.log("error in the EmailVerificationFormForPassword ", error);
    }
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleGetOTP)}>
      <div className="relative">
        <Input
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="xyz@example.com"
          error={errors.email ? errors.email.message : ""}
        />
      </div>

      {showOtpInputBox === false && (
        <Button
          children={requestingOTP ? "Getting..." : "Get-OTP"}
          variant="primary"
          size="sm"
          className="cursor-pointer"
        />
      )}

      {showOtpInputBox && (
        <div className="space-y-6">
          <div className="relative">
            <Input
              label="OTP"
              type="text"
              {...register("otp")}
              placeholder="Enter OTP"
              error={errors.otp ? errors.otp.message : ""}
            />
          </div>
          <div>
            <Button
              children={verifiyingOTP ? "Verifying..." : " Verify"}
              size="sm"
              type="submit"
              disabled={verifiyingOTP}
              className="rounded-full px-3 py-2 cursor-pointer"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default EmailVerificationFormForPassword;
