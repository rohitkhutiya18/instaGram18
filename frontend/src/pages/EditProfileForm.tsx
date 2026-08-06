import { Camera } from "lucide-react";
import { useState } from "react";
import Input from "../component/ui/input/Input";
import Label from "../component/ui/label/Label";
import {
  useDeleteProfilePicMutation,
  useUpdateProfilePicMutation,
  useUpdateUserDataMutation,
} from "../services/user.Api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TempUserImage from "../assets/tempUser.jpg";
import type { updateUserSchemaInterface } from "../schema/updateUserSchema";

const EditProfileForm = () => {
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [requestDeletingProfilePic, { isLoading: deleting }] =
    useDeleteProfilePicMutation();
  const [requestUpdatingProfilePic] =
    useUpdateProfilePicMutation();

    const [updateUserData,{isLoading:updatingUser}] = useUpdateUserDataMutation()

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const location = useLocation();
  const navigate = useNavigate()

  console.log(location.state);

  const {
    register,
    handleSubmit
  } = useForm<updateUserSchemaInterface>({
    defaultValues: {
      email: location.state?.email || "",
      bio: location.state?.bio || "",
      name: location.state?.name || "",
    },
  });

  const handleDeleteImage = async () => {
    try {
      const public_id = location.state.public_id;
      if (public_id == null) {
        return;
      }
   await requestDeletingProfilePic({ public_id }).unwrap();
      toast.success("profile pic removed successfully");
    } catch (error) {
      console.log(
        "there is an error in the handledeleteimage in edit profile from",
        error,
      );
    }
  };

  const handleUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = Array.from(e.target.files || []);

      if (file.length === 0) {
        toast.warning("something went wrong");
        return;
      }

      setProfileImage(file[0]);
       
      console.log(profileImage)
      const formData = new FormData();

      formData.append("public_id", location.state?.public_id || "");
      formData.append("newProfilePic", profileImage || "");

      for (let [key, value] of formData) {
        console.log(key, "   ", value);
      }

      await requestUpdatingProfilePic(formData).unwrap();
      toast.success("image update successfully");
      navigate('/profile')
    } catch (error) {
      console.log("there is an error in the handleupadteImage function", error);
    }
  };

  const onSubmit = async (data: updateUserSchemaInterface) => {
    try {
      // const formData = new FormData();
      // formData.append("bio", data.bio);
      // formData.append("userName", data.name);
      // formData.append("email", data.email);

      const updatedData = {
        bio:data.bio,
        userName:data.name,
        email:data.email
      }
     

    const res = await updateUserData(updatedData).unwrap();
      console.log(res)
      // toast.success("profile update successfully")
      navigate('/profile')
    } catch (error) {
      console.log("there is an error in the handle update user profile", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b
  from-[#fff7f6] via-[#fdeceb] to-[#f9d8d6]
  flex items-center justify-center p-8"
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-white/40
    bg-white/50 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]
    p-8"
      >
        <h1 className="text-3xl font-bold text-[#4f4444]">Edit Profile</h1>

        <p className="mt-2 text-[#7c6d6b]">Update your personal information.</p>

        {/* Profile Picture */}
        <div className="mt-10 flex justify-center">
          <div className="relative">
            <img
              src={location.state?.profilePic || TempUserImage}
              onError={(e) => {
                e.currentTarget.src = TempUserImage;
              }}
              className="h-36 w-36 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <button
              onClick={() => setShowImageMenu((prev) => !prev)}
              className="absolute bottom-1 right-1 flex h-11 w-11 items-center
      justify-center rounded-full bg-[#4f4444]
      text-white shadow-lg transition hover:scale-95"
            >
              <Camera />
            </button>

            {showImageMenu && (
              <div
                className="absolute right-0 top-full mt-3 w-48
        overflow-hidden rounded-2xl border border-white/40
        bg-white/70 backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
                <label
                  htmlFor="profile-image"
                  className="block cursor-pointer px-5 py-3
          text-[#4f4444] transition hover:bg-white/60"
                >
                  Change Photo
                </label>

                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpdateImage}
                />

                {location.state?.url && (
                  <button
                    onClick={handleDeleteImage}
                    className="w-full border-t border-white/40
          px-5 py-3 text-left text-red-500
          transition hover:bg-red-50"
                  >
                    {deleting ? "Removing..." : `Remove Photo`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className="mt-10 space-y-6">
          <div>
            <Input
              label="Name"
              {...register("name")}
              placeholder="update your name"
              className="w-full rounded-2xl
          border border-white/40
          bg-white/70
          px-5 py-3
          outline-none
          text-[#4f4444]
          placeholder:text-[#8a7775]
          focus:ring-2 focus:ring-[#f3b8b4]"
            />
          </div>

          <div>
            <Label
              children="Bio"
              className="block mb-2 font-medium text-[#4f4444]"
            />

            <textarea
              {...register("bio")}
              rows={5}
              className="w-full rounded-2xl
          border border-white/40
          bg-white/70
          px-5 py-3
          outline-none
          resize-none
          text-[#4f4444]
          placeholder:text-[#8a7775]
          focus:ring-2 focus:ring-[#f3b8b4]"
            />
          </div>

          <div>
            <Input
              {...register("email")}
              label="Email"
              disabled
              placeholder="email"
              className="w-full rounded-2xl
          border border-white/40
          bg-white/70
          px-5 py-3
          outline-none
          text-[#4f4444]
          placeholder:text-[#8a7775]
          focus:ring-2 focus:ring-[#f3b8b4]"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            className="cursor-pointer rounded-2xl border border-white/40
        bg-white/50
        px-6 py-3
        text-[#4f4444]
        transition hover:bg-white/70"
          >
            Cancel
          </button>

          <button
          type="submit"
            className="cursor-pointer rounded-2xl
        bg-gradient-to-r
        from-[#f3b8b4]
        to-[#e8a8a3]
        px-6 py-3
        font-semibold
        text-[#4f4444]
        shadow-lg
        transition
        hover:scale-95"
          >
            {updatingUser ? "Changing..." : "Save Changes"}
          </button>
        </div>
        </form>
       
      </div>
    </div>
  );
};

export default EditProfileForm;
