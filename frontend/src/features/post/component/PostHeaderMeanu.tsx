import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react'

interface prop {
  updatePost :()=>void,
  postCreatorId:string,
  deletePost:()=>void
}

const PostHeaderMeanu = ({updatePost,postCreatorId,deletePost}:prop) => {
    const [showOptions,setShowOptions] = useState(false)
    const token = window.sessionStorage.getItem("accessToken")
    const userData =JSON.parse(window.localStorage.getItem('userData') || '{}')


//     const menuRef = useRef(null);

// useEffect(() => {
//   const handleClickOutside = (e) => {
//     if (menuRef.current && !menuRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);

//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);

  return (
    <div>
        <div className="relative">
  <button
    onClick={() => setShowOptions((prev) => !prev)}
    className="rounded-full p-2 transition hover:bg-zinc-100"
  >
    <MoreHorizontal className="text-zinc-500" size={20} />
  </button>

  {showOptions && (
    <div
      className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl
      border border-white/40 bg-white shadow-xl backdrop-blur-xl"
    >
      {(token && userData !== "{}" && userData.userId === postCreatorId) ? (
        <>
          <button
            onClick={()=>updatePost()}
            className="w-full px-4 py-3 text-left text-sm text-zinc-700
            transition hover:bg-pink-100"
          >
             Update Post
          </button>

          <button
            onClick={()=>deletePost()}
            className="w-full border-t px-4 py-3 text-left text-sm
            text-red-500 transition hover:bg-red-50"
          >
             Delete Post
          </button>
        </>
      ) : (
        <button
        //   onClick={handleReport}
          className="w-full px-4 py-3 text-left text-sm text-red-500
          transition hover:bg-red-50"
        >
          Report Post
        </button>
      )}
    </div>
  )}
</div>
    </div>
  )
}

export default PostHeaderMeanu