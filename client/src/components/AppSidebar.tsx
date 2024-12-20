import { Book, HelpCircle, Home, Settings, Users } from "lucide-react";
import quyl from "../assets/quyl.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Chapter",
    url: "/chapter",
    icon: Book,
  },
  {
    title: "Help",
    url: "/help",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar>
      <div className="py-7 px-3 h-full bg-white">
        <SidebarHeader>
          <img className="w-24 mb-7" src={quyl} alt="logo" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton size="lg">
                      <NavLink
                        to={item.url}
                        onClick={() => handleClick(item.url)}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-[#EEEEEE] rounded-lg p-2 block w-full"
                            : "text-gray-600 p-2 block w-full"
                        }
                      >
                        <div className="flex gap-3 ">
                          <item.icon className="h-6 w-6" />
                          <span className="text-base  font-bold">
                            {item.title}
                          </span>
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
