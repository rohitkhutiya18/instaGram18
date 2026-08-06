const AuthFooter = () => {
  return (
    <footer className="mt-10 text-center">
      <p className="text-sm text-[#4f4444]">
        By continuing, you agree to the
        <span className="text-[#715857] font-semibold ml-1">Terms</span>
      </p>

      <p className="mt-6 text-sm text-[#4f4444]">
        Already have an account?
        <span
          className="ml-1 font-bold text-[#715857] cursor-pointer "
        >
          Login here
        </span>
      </p>

      <div className="flex items-center gap-4 justify-center mt-6 opacity-40">
        <div className="h-px w-12 bg-gray-400" />

        <span className="text-xs tracking-widest">SECURED BY NEXUS</span>

        <div className="h-px w-12 bg-gray-400" />
      </div>
    </footer>
  );
};

export default AuthFooter;
