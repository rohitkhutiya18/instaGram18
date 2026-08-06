import Footer from "../component/Footer";
import LoginBackGround from "../component/LoginBackGround";
import LoginCard from "../component/LoginCard";

const Login = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br
     from-[#fdf5f5] via-[#fbeaea] to-[#f8dede] px-4"
    >
      <LoginBackGround />

      <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* <LoginBrand /> */}
          <LoginCard />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Login;
