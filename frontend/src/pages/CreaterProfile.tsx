import CreaterPagePost from "../component/createrProfile/CreaterPagePost";
import CreaterProfileCard from "../component/createrProfile/CreaterProfileCard";
import { useCreaterProifleQuery } from "../services/user.Api";
import { useLocation } from "react-router-dom";

const CreaterProfile = () => {
  const location = useLocation();
  console.log(location.state);
  const {
    data: userData,
    isLoading,
    isError,
  } = useCreaterProifleQuery({ userId: location.state.userId });
  console.log(userData);
  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#fff7f6] via-[#fdeceb]
     to-[#f9d8d6] py-10"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Profile Card */}
        <CreaterProfileCard createrPagePostProp={userData} />

        {/* Posts */}
        <div className="mt-10 rounded-3xl border border-white/40 bg-white/50 p-6 shadow-xl backdrop-blur-xl">
          <CreaterPagePost createrPagePostProp={userData} />
        </div>
      </div>
    </div>
  );
};

export default CreaterProfile;
