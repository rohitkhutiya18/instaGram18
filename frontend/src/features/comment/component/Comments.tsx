import { useGetCommentQuery } from "../services/commentApi";
import type { commentInterface } from "../../../types/comment.interface";
import CommentItem from "./CommentItem";
interface props {
  postId:string,
  replyTo:string | null,
   setReplyTo:(args:string)=>void
}
const Comments = ({postId,setReplyTo}:props) => {
  // const [editId, setEditId] = useState<string | null>(null);
  // const [editText, setEditText] = useState("");
  const {data:commentdata} = useGetCommentQuery(postId);
  console.log(commentdata)


  const commentArray : commentInterface[] = commentdata ? commentdata : []
  
  return (
    <div>
      <div className="h-64 overflow-y-auto space-y-3">
             {commentArray.length>0 && commentArray.map((item)=>{
              return <CommentItem 
               key={item.id}
               comment={item}
               setReplyTo={setReplyTo}
              />
             })}
        </div>
     
    </div>
  );
};

export default Comments;


//  <div className="h-64 overflow-y-auto space-y-3">
//         {commentArray.length > 0 && commentArray.map((item) => (
//           <div key={item.id} className="bg-white/40 rounded-2xl p-3">
//             <h4 className="font-semibold text-[#4f4444]">{item.user.userName}</h4>

//             {editId === item.id ? (
//               <div className="flex gap-2 mt-2">
//                 <input
//                   value={editText}
//                   onChange={(e) => setEditText(e.target.value)}
//                   className="flex-1 rounded-xl px-3 py-2 bg-white/60"
//                 />

//                 <button
//                   // onClick={() => updateComment(item.id)}
//                   className="text-sm bg-[#a9615d] text-white px-3 rounded-xl"
//                 >
//                   Save
//                 </button>
//               </div>
//             ) : (
//               <p className="text-sm text-[#765b59]">{item.comment}</p>
//             )}

//             <div className="flex gap-4 mt-2 text-xs text-[#8b625f]">
//               <button
//                 onClick={() => {
//                    setReplyTo(item.id);
//                 }}
//               >
//                 Reply
//               </button>

//               {/* <button
//                 onClick={() => {
//                   setEditId(item.id);
//                   setEditText(item.comment);
//                 }}
//               >
//                 Edit
//               </button> */}
//             </div>

//             {/* Replies */}
//             {item.childComments && item.childComments.length > 0 && (
//               <div className="ml-5 mt-3 space-y-2">
//                 {item.childComments.map((reply) => (
//                   <div key={reply.id} className="bg-white/30 rounded-xl p-2">
//                     <h5 className="font-semibold text-xs text-[#4f4444]">
//                       {reply.user.userName}
//                     </h5>

//                     <p className="text-xs text-[#765b59]">{reply.comment}</p>
                    
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>