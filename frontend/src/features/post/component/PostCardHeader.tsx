import { useFollowUserMutation, useUnFollowUserMutation } from '../services/followApi'
import Button from '../../../component/ui/button/Button'
import type { userProfilePic } from '../../../types/Scroll.Feed.Interface'
import PostHeaderMeanu from './PostHeaderMeanu'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
interface prop {
  postCardHeaderProp:{
    userName:string,
    isFollowed:boolean,
    postCreaterId:string,
    user_profilePic:userProfilePic,
    updatePost : ()=>void,
    deletePost:()=>void
  }
}

const PostCardHeader = ({postCardHeaderProp}:prop) => {

const [requestFollowing] = useFollowUserMutation()
const [requestUnFollowing] = useUnFollowUserMutation()
const navigate = useNavigate();
const logdinProfle = JSON.parse(window.localStorage.getItem('userData') || "{}")

  const handleFollowUser = async(id:string)=>{
    try {
      if(postCardHeaderProp.isFollowed == false){
      await requestFollowing({id}).unwrap();
      return;
    }
        await requestUnFollowing({id}).unwrap();
    } catch (error) {
    const err = error as {data:{message:{message:string}}}
      const errMessage = err.data.message.message || "something went wrong"
      toast.error(errMessage)
      navigate('/login')
     
    }
  }

  const handleUpdatePost = ()=>{
    postCardHeaderProp.updatePost()
    return;
  }

    const handleDeletePost = ()=>{
    postCardHeaderProp.deletePost()
    return;
  }

   const createrProfile = ()=>{
       if(postCardHeaderProp.postCreaterId == logdinProfle.userId){
        navigate('/profile')
       }else{
        navigate(`/profile/${postCardHeaderProp.userName}`,{state:{userId:postCardHeaderProp.postCreaterId}})
        
      }
  }


  return (
    <div>
            <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3" onClick={createrProfile}>
          <img
            src={postCardHeaderProp.user_profilePic?.url || "https://i.pravatar.cc/150?img=12"}
            alt="profile"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-zinc-800">{postCardHeaderProp.userName}</h3>
            <p className="text-sm text-zinc-500">@{postCardHeaderProp.userName}</p>
          </div>
        </div>

      <div className="flex items-center gap-3">
         {postCardHeaderProp.postCreaterId != logdinProfle.userId &&   <Button
          onClick={()=>{handleFollowUser(postCardHeaderProp.postCreaterId)}}
          className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer text-white transition-all 
             duration-200 ${
       postCardHeaderProp.isFollowed
      ? "bg-zinc-500/40 hover:bg-zinc-500/60"
      : "bg-bg-[var(--text-secondary)]"
  }`}
   children= {postCardHeaderProp.isFollowed ? "followed" : 'follow'}
  />}
           
          

        <PostHeaderMeanu updatePost={handleUpdatePost} 
        deletePost={handleDeletePost}
        postCreatorId={postCardHeaderProp.postCreaterId}/>
     
        </div>
      </header>
    </div>
  )
}

export default PostCardHeader