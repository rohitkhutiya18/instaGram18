interface prop{
 postCardCaptionProp:{caption:string,userName:string}
}

const PostCardCaption = ({postCardCaptionProp}:prop) => {
  return (
    <div>
         <div className="px-4 pb-5">
        <p className="text-sm leading-7 text-zinc-700">
          <span className="mr-2 font-semibold">{postCardCaptionProp.userName}</span>
         {postCardCaptionProp.caption}
        </p>
      </div>
    </div>
  )
}

export default PostCardCaption