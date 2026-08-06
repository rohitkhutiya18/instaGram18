import {
  Bell,
  Home,
  MessageCircle,
  Plus,
  Search,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBarNavigation = () => {
  const navigationItem = [
    { icon: Home, label: "Home", url: "/" },
    //{ icon: Search, label: "Search", url: "/search" },
   // { icon: Bell, label: "Notifications", url: "/notification" },
    { icon: MessageCircle, label: "Messages", url: "/chat" },
    { icon: Plus, label: "Create", url: "/create-post" },
    { icon: User, label: "Profile", url: "/profile" },
  ];

  return (
    <div className="flex md:flex-col items-center md:items-stretch justify-around md:justify-start w-full gap-1 md:gap-2">
      {navigationItem.map(({ icon: Icon, label, url }) => (
        <Link
          key={label}
          to={url}
          className="group flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 flex-1 rounded-xl md:rounded-2xl px-2 py-2 md:py-3 text-[#5d4f4d] transition-all duration-300 hover:bg-white/70 hover:shadow-lg hover:shadow-[#f3b8b4]/30"
        >
          <Icon
            size={22}
            className="transition group-hover:scale-110 group-hover:text-[#9b5e5a]"
          />

          {/* Hide labels on mobile */}
          <span className="hidden md:block font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default SideBarNavigation;