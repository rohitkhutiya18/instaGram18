import { Grid3X3, Heart, MessageCircle, Users } from "lucide-react";
import type { userProfileInterface } from "../../types/user.interface";

interface prop{
  createrPagePostProp:userProfileInterface
}

const CreaterPagePost = ({createrPagePostProp}:prop) => {


  const userPost = createrPagePostProp?.userPostData || []

  return (
    <div><div className="mb-8 flex items-center justify-center gap-2">
            <Grid3X3 size={22} className="text-[#4f4444]" />
            <h2 className="text-xl font-bold text-[#4f4444]">
              Posts
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userPost.length > 0 && userPost.map((post) => (
              <div
                key={post.id}
                className="group relative overflow-hidden rounded-3xl shadow-lg"
              >
                <img
                  src={post.images?.[0].url }
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
                  alt=""
                />

                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center gap-8
                  bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100"
                >
                  <div className="flex items-center gap-2 text-white">
                    <Heart fill="white" size={20} />
                    <span>{post.likes}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white">
                    <MessageCircle size={20} />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            )) }
          </div>

          {userPost.length === 0 && (
            <div className="py-20 text-center">
              <Users
                className="mx-auto mb-4 text-[#7c6d6b]"
                size={60}
              />
              <h3 className="text-xl font-semibold text-[#4f4444]">
                No Posts Yet
              </h3>
            </div>
          )}</div>
  )
}

export default CreaterPagePost