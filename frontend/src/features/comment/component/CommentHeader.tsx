interface props{
    onClose:()=>void
}
const CommentHeader = ({onClose}:props) => {
  return (
    <> <div className="flex justify-between mb-5">
          <h2 className="text-xl font-bold text-[#4f4444]">Comments</h2>

          <button
            onClick={onClose}
            className="rounded-full bg-white/40 px-3 py-1 
            text-[#5c4442]"
          >
            ✕
          </button>
        </div></>
  )
}

export default CommentHeader