import PostCard from "../features/post/component/PostCard";
import type { scrollFeedInterface } from "../types/Scroll.Feed.Interface";
import {
  useFetchPostsWithOutLoginQuery,
  useFetchPostWithLoginQuery,
} from "../features/post/services/postApi";

const FeedSection = () => {
  const token = window.sessionStorage.getItem("accessToken");

  const { data: loginData } = useFetchPostWithLoginQuery(undefined, {
    skip: !token,
  });
  const { data: guestData } = useFetchPostsWithOutLoginQuery(undefined, {
    skip: !!token,
  });

  return (
    <div className="left-65 space-y-3">
      {token
        ? loginData?.map((val: scrollFeedInterface, index: number) => {
            return <PostCard key={index} postCardProp={val} />;
          })
        : guestData?.map((val: scrollFeedInterface, index: number) => {
            return <PostCard key={index} postCardProp={val} />;
          })}
    </div>
  );
};

export default FeedSection;
