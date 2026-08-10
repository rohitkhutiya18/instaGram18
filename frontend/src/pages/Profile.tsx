import ProfileCard from "../component/profilePageComponents/ProfileCard";
import ProfilePagePost from "../component/profilePageComponents/ProfilePagePost";
import { useUserProfileQuery } from "../services/user.Api";

const Profile = () => {
  const { data: userData, isLoading: fetchingUserData } =
    useUserProfileQuery(undefined);

  console.log(userData);

  if (fetchingUserData) {
    return <h1>loading...</h1>;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#fff7f6] via-[#fdeceb]
     to-[#f9d8d6] py-10"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Profile Card */}
        <ProfileCard profilePagePostProp={userData} />

        {/* Posts */}
        <div className="mt-10 rounded-3xl border border-white/40 bg-white/50 p-6 shadow-xl backdrop-blur-xl">
          <ProfilePagePost profilePagePostProp={userData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
