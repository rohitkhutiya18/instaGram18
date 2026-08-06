const ProfileUpload = () => {
  return (
    <section className="flex flex-col items-center mb-10">
      <div
        className=" w-32 h-32 rounded-full bg-[#ede7e6] border-2 border-dashed border-[#817473]/30 
        flex items-center justify-center text-[#817473] "
      >
        <span className="text-4xl">+</span>
      </div>

      <button
        className="mt-4 px-6 py-2 rounded-full bg-[#f2edec] text-sm font-medium text-[#4f4444] 
        border border-[#817473]/20 hover:bg-[#ede7e6] transition">
        Manage Photo
      </button>
    </section>
  );
};

export default ProfileUpload;
