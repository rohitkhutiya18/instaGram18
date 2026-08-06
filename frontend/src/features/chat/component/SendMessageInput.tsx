import { useForm } from "react-hook-form";
import { socket } from "../../../socket/socket";
import type { userProfileInterface } from "../../../types/user.interface";
import Input from "../../../component/ui/input/Input";
import { useState } from "react";


interface props {
  user:userProfileInterface
  setChatHistory:(args:any)=>void
}
const SendMessageInput = ({user}:props) => {
  const {register,handleSubmit,formState:{errors}} = useForm()
  const [inputMessage,setInputMessage] = useState<string>('')

  const sendMessage=(data:any)=>{
    try {
      socket.emit('sendMessage',{
        receiverId:user.id,
        message:data?.message || inputMessage,
        reciverEmail:user.email
      })

      setInputMessage('')
    } catch (error) {
      console.log("there is an error in the sendMessageInput",error)
    }
  }


  return (
    <>
      <div className="border-t bg-white/30 p-4 shrink-0">
        <div >
          <form onSubmit={handleSubmit(sendMessage)} className="flex gap-3">
          <Input
             {...register('message')}
            value={inputMessage}
            onChange={(e)=>setInputMessage(e.target.value)}
            error={errors.form?.message && errors.form.message}
            placeholder="Write a message..."
            className="
            w-full 
            flex-1 rounded-2xl
                bg-white/60
                px-5  
                py-4
                outline-none"
          />

          <button
        
            className="rounded-2xl
                bg-gradient-to-r
                from-[#f3b8b4]
                to-[#f9d8d6]
                px-7
                font-semibold
                text-[#4f4444]
                transition
                hover:scale-95"
          >
            Send
          </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SendMessageInput;
