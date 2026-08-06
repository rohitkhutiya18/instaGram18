import { useNavigate } from "react-router-dom"
import type { userProfileInterface } from "../../types/user.interface"
import Button from "../ui/button/Button"

interface props{
    createrPagePostProp:userProfileInterface
}
const CreaterProfileCard = ({createrPagePostProp}:props) => {
  const navigate = useNavigate()
  const handleMessage = ()=>{
    navigate('/chat',{state:{user:createrPagePostProp}})
  }
  return (
    <div>  <div>
      <div className="rounded-3xl border border-white/40 bg-white/50 p-8 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            {/* Profile Image */}
            <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img
                src={
                  createrPagePostProp.profilePic?.url ||
                  "https://i.pravatar.cc/306"
                }
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-3xl font-bold text-[#4f4444]">
                  {createrPagePostProp.userName || "Username"}
                </h1>

                <Button
                onClick={handleMessage}
                variant="primary"
                className="rounded-xl  px-6 py-2 font-semibold text-[#4f4444]
                 transition hover:scale-95 cursor-pointer"
                  children="Message" />
               
              </div>

              <p className="mt-2 text-[#7c6d6b]">
                @{createrPagePostProp.userName || "username"}
              </p>

              {/* Stats */}
              <div className="mt-6 flex flex-wrap gap-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#4f4444]">
                    {createrPagePostProp?.postCount || 0}
                  </h2>
                  <p className="text-[#7c6d6b]">Posts</p>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#4f4444]">
                     {createrPagePostProp?.followerCount || 0}
                  </h2>
                  <p className="text-[#7c6d6b]">Followers</p>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#4f4444]">
                     {createrPagePostProp?.followingCount || 0}
                  </h2>
                  <p className="text-[#7c6d6b]">Following</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <h3 className="font-semibold text-[#4f4444]">
                  bio
                </h3>
                <p className="mt-1 text-[#7c6d6b]">
                   {createrPagePostProp?.bio || ''}
                </p>
              </div>
            </div>
            
          </div>
        </div></div></div>
  )
}

export default CreaterProfileCard