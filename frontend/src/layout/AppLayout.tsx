import type { ReactNode } from "react";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <SideBar />

      <main
        className="
          md:ml-64
          h-screen
          p-4
          md:p-6
          pb-24
          md:pb-6
        "
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;