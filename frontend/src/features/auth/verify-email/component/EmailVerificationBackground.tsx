const EmailVerificationBackground = () => {
  return (
    <div className="fixed inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/login-bg.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/20" />

      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
};

export default EmailVerificationBackground;