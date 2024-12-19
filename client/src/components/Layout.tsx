import { Sidebar } from "./Sidebar";
import Navbar from "./Header";
import { ReactNode, useRef, useState, useEffect } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsCollapsed(true); // Collapse the sidebar
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar ref={sidebarRef} isCollapsed={isCollapsed} />
      <div className="flex-1 ml-16 md:ml-0">
        <Navbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
