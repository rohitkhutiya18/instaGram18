import EmailVerificationFormForPassword from "./EmailVerificationFormForPassword";

const EmailVerificationCardForPassword = () => {
  return (
    <div className="rounded-3xl border border-white/40 bg-white p-10 backdrop-blur-3xl shadow-2xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-[var(--text-secondary)]">
          Forget-Password
        </h2>
      </div>

      <EmailVerificationFormForPassword />
    </div>
  );
};

export default EmailVerificationCardForPassword;