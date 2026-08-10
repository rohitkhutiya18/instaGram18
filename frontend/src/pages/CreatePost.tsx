
import Label from "../component/ui/label/Label"
import Button from "../component/ui/button/Button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Upload, X } from "lucide-react"
import { toast } from "react-hot-toast"
import type { createPostSchemaType } from "../schema/createPostSchema"
import { useCreatePostMutation } from "../features/post/services/postApi"
import { useNavigate } from "react-router-dom"


const CreatePost = () => {
 const token = window.sessionStorage.getItem("accessToken")
 const navigate = useNavigate()
 
 if(!token){
  navigate('/login')
  return;
 }

    const {register,handleSubmit,formState:{errors}} = useForm<createPostSchemaType>();

    const [imagesArr,setImagesArr] = useState<File[]>([])

    const [requestCreatingPost,{isLoading:creatingPost}] = useCreatePostMutation()


    const handleImages = (e: React.ChangeEvent<HTMLInputElement>)=>{
      const imgInputArr = Array.from(e.target.files ?? []);
           if(imagesArr.length + imgInputArr.length > 3){
            return toast.error("you can't add more than 3 images")
           }

           setImagesArr((prev)=>[...prev,...imgInputArr])

           e.target.files = null
    }
   
    const removeImage = (index:number)=>{
      const temp = imagesArr.filter((_,i)=>i!==index)
      setImagesArr(temp)
    }

    const onSubmit = async (data:createPostSchemaType)=>{
      if(imagesArr.length === 0){ 
          return  toast.error("minimun one image is required post create ")
           }
        try {
          const formData = new FormData();
          formData.append("caption",data.caption);
          
          for(let file of imagesArr){
            formData.append('postImages',file);
          }

              await requestCreatingPost(formData).unwrap()
             toast.success("post is created");
             navigate('/')
             
        } catch (error) {
          console.log("errror in the createPostComponent",error);
        }
    }

  return (
    <div className={`mx-auto w-full max-w-2xl rounded-3xl border border-white/30 
    bg-gradient-to-br from-[#fff7f6af] via-[#fdeceb] to-[#f9d8d6] p-8 
    shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl`}>
  {/* Header */}
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-[#4f4444]">
      Create Post
    </h2>
    <p className="mt-2 text-sm text-[#7c6d6b]">
      Share your thoughts and favorite moments.
    </p>
  </div>
<form onSubmit={handleSubmit(onSubmit)}>
  {/* Caption */}
  <div className="space-y-2">
    <Label
    children="Caption"
    className="text-sm font-semibold text-[#5c4f4f]"/>

    <textarea
    {...register('caption')}
      rows={5}
      placeholder="What's on your mind?"
      className={`w-full resize-none rounded-2xl border border-white/50 bg-white/60 p-4
         text-[#4f4444] placeholder:text-[#9b8786] outline-none transition-all focus:border-[#d8a6a3] 
         focus:ring-4 focus:ring-[#f4d4d2]`}/>
         {errors.caption && <p className="text-sm text-rose-500">{errors.caption.message}</p>}
  </div>

  {/* Upload */}
  <div className="mt-8 space-y-3">
    <Label className="text-sm font-semibold text-[#5c4f4f]" 
    children="Images"/>

    <label
      htmlFor="images"
      className={`flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed
       border-[#e5bdbb] bg-white/50 transition-all hover:border-[#d8a6a3] hover:bg-[#eededd]`}
    >
      <Upload className={`mb-3 h-10 w-10 text-[#b98c89]`} size={30}/>

      <span className="font-medium text-[#6d5654]">
        Click to upload images
      </span>

      <span className="mt-1 text-sm text-[#9b8786]">
        PNG, JPG or WEBP
      </span>

      <input
        id="images"
        type="file"
        accept="image/*"
        multiple
        onChange={(e)=>{handleImages(e)}}
        className="hidden"
      />
    </label>
  </div>

  {/* Preview */}
  <div className="mt-8">
    <Label
    children="Preview"
    className="text-sm font-semibold text-[#5c4f4f]"/>

    <div className="grid grid-cols-3 gap-4">
     {
      imagesArr.length > 0 && imagesArr.map((val,index)=>{
        const imgUrl = URL.createObjectURL(val)
        return  <div 
         key={val.name}
        className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md">
        <img
          src={imgUrl}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />

        <button 
        onClick={()=>{removeImage(index)}}
        className="absolute  top-3 right-3 rounded-full cursor-pointer bg-rose-500 text-sm text-white font-semibold 
        flex justify-center items-center transition-all duration-300 hover:bg-rose-400">
          <X />
        </button>
      </div>
      })
     }

      
    </div>
  </div>

  {/* Button */}
  <Button
  type="submit"
  children={creatingPost ?"Creating..." :'Create Post'}
    className={`mt-10 flex w-full items-center justify-center rounded-2xl py-4 text-lg font-semibold 
         text-white shadow-lg shadow-[#cb8782]/30 transition-all duration-300 hover:-translate-y-1
          hover:shadow-xl hover:shadow-[#cb8782]/40 active:scale-[0.98]`}/>
          </form>
</div>
  )
}

export default CreatePost