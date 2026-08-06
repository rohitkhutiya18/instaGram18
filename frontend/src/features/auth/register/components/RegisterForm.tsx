import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../services/auth.feature";
import {
  registerSchema,
  type registerFormType,
} from "../../../../schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Input from "../../../../component/ui/input/Input";
import Button from "../../../../component/ui/button/Button";
import { useState } from "react";
import { Camera } from "lucide-react";
import PasswordField from "../../../../component/ui/input/PasswordInput";
import Label from "../../../../component/ui/label/Label";

const RegisterForm = ({email}:{email:string}) => {
  const [requestRegisterUser, { isLoading:regesteringUser }] =
    useRegisterUserMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: email,
    },
  });

  const [profileImage,setProfileImage] = useState<File|null> (null);
  const navigate = useNavigate();

  const onSubmit = async (data: registerFormType) => {
    try {
      const formData = new FormData();
      formData.append('userName',data.userName);
      formData.append("email",data.email)
      formData.append('bio',data.bio)
      formData.append('password',data.password)
      if(profileImage){
      formData.append('profileImage',profileImage)}

      const res = await requestRegisterUser(formData).unwrap();
          console.log(res)

      navigate("/login", {
        state: { email: data.email, password: data.password },
      });
    } catch (error) {
      const err = error as { data:{message: string ,statusCode:number} };
      console.log("there is an error in the register from ", err.data.message);

      if (err.data.statusCode == 406) {
         toast.info("This email is already registered", {
        position: "top-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
        navigate("/login", {
          state: { email: data.email, password: data.password },
        });
      }

    }
  };

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement> )=>{
    const file = e.target.files
    setProfileImage(file?.[0] || null);
  }

  return (
      <form
           onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Profile Image */}

          <div className="flex justify-center">
            <label className="relative cursor-pointer">
              <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#f3b8b4] flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                ) : (
                  <Camera
                    size={34}
                    className="text-[#4f4444]"
                  />
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleProfileImage}
              />
            </label>
          </div>

          {/* Name */}

          <div>

            <Input
              type="text"
              label="userName"
              placeholder="John Doe"
              {...register('userName')}
              error={errors.userName && errors.userName.message}
              className="w-full rounded-2xl border border-white/50 bg-white/60 p-3 outline-none focus:ring-2 focus:ring-[#f3b8b4]"
            />
          </div>

          {/* Email */}

          <div>
            <Input
              type="email"
               label="email"
               {...register('email')}
               error={errors.email && errors.email.message}
              placeholder="john@gmail.com"
              className="w-full rounded-2xl border border-white/50
               bg-white/60 p-3 outline-none focus:ring-2 focus:ring-[#f3b8b4]"
            />
          </div>

          {/* bio  */}
           <div className="space-y-2">
              <Label
              children="bio"
             className="mb-2 block text-xs uppercase tracking-[4px] text-[var(--text-primary)]"/>
          
              <textarea
              {...register('bio')}
                rows={2}
                placeholder="What's on your mind?"
                className={`w-full resize-none rounded-2xl border border-white/50 bg-white/60 p-4
                   text-[#4f4444] placeholder:text-[#9b8786] outline-none transition-all focus:border-[#d8a6a3] 
                   focus:ring-2 focus:ring-[#f4d4d2]`}/>
            </div>

          {/* Password */}

          <div>
            <PasswordField 
          placeholder="enter password"
          label="Password"
          {...register('password')}
          error={errors.password ? errors.password.message : ""}
          />
          </div>

          <Button
          type="submit"
          children={regesteringUser?"Registering...":'Register'}
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-[#f3b8b4]
            to-[#e99d98] py-3 text-[#4f4444] font-semibold transition hover:scale-[0.98] hover:shadow-lg"
          />

          <p className="text-center text-[#7c6d6b]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#4f4444] hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
  );
};

export default RegisterForm;

