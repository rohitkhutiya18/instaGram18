import EmailVerificationBackground from "../verify-email/component/EmailVerificationBackground";
import EmailVerificationCardForPassword from "./EmailVerificationCardForPassword";

const EmailVerifyForPassword = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fef8f7]">
      <EmailVerificationBackground/>

      <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-lg">
             <EmailVerificationCardForPassword/>
        </div>
      </main>
    </div>
  );
};

export default EmailVerifyForPassword;