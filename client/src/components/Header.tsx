import { Bell, HelpCircle, MessageSquare, Settings } from "lucide-react";
import { Input } from "./ui/input";
import profile from "../assets/profile.svg";
import { Sheet, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavLink } from "react-router-dom";
import quyl from "../assets/quyl.svg";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HelpCircle,
  },
  {
    title: "Students",
    href: "/students",
    icon: Bell,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Header({ collapsed }: { collapsed: boolean }) {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2">
      {isMobile ? (
        <Sheet>
          <SheetContent side="left" className="w-[280px] sm:w-[350px]">
            <nav className="flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-4">
                <img className="w-20 sm:w-24" src={quyl} alt="logo" />
              </div>

              <div className="flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm">{item.title}</span>
                  </NavLink>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        <></>
      )}

      <div className="flex-1 max-w-3xl mx-4">
        <Input
          placeholder="Search for a course"
          className={`h-12 w-full transition-all duration-300 ${
            collapsed ? "max-w-2xl" : "max-w-4xl"
          }`}
        />
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-200 transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-200 transition-colors"
            aria-label="Messages"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-200 transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-200 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <img
              src={profile}
              alt="Profile"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
            />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <h1 className="hidden md:block text-sm font-medium truncate max-w-[150px]">
            Adeline H. Dancy
          </h1>
        </div>
      </div>
    </div>
  );
}
