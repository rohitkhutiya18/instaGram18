const Footer = () => {
  return (
    <div className="mt-8 flex items-center justify-between px-4">
      <div className="flex gap-2">
        <span className="h-2 w-2 rounded-full bg-[#715857]/20" />
        <span className="h-2 w-2 rounded-full bg-[#715857]/40" />
        <span className="h-2 w-2 rounded-full bg-[#715857]/20" />
      </div>

      <p className="text-[10px] uppercase tracking-[4px] text-[#715857]/60">
        Insta © 2024
      </p>
    </div>
  );
};

export default Footer;