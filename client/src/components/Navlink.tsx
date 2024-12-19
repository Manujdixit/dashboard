import { Link, useLocation } from "react-router-dom";
import React from "react";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

export const NavLink = ({ to, icon, label, isCollapsed }: NavLinkProps) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center p-3 ${
        isActive ? "text-[#0A0A0A] bg-[#EEEEEE]" : "text-[#6F767E]"
      } hover:bg-gray-200 rounded-md leading-5 transition-colors ${
        isCollapsed ? "justify-center" : ""
      }`}
    >
      <div className="flex gap-3 items-center font-bold">
        <span className="text-xl">{icon}</span>
        {!isCollapsed && <span className="text-base">{label}</span>}
      </div>
    </Link>
  );
};
