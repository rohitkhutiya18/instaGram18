import EmailVerificationBackground from "./component/EmailVerificationBackground";
import EmailVerificationCard from "./component/EmailVerificationCard";

const EmailVerification = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fef8f7]">
      <EmailVerificationBackground/>

      <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-lg">
             <EmailVerificationCard/>
        </div>
      </main>
    </div>
  );
};

export default EmailVerification;