"use client";

import * as React from "react";
import { History, Vote, GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
import Login from "@/components/login";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  teams: [
    {
      name: "Betting",
      logo: GalleryVerticalEnd,
    },
  ],
  navMain: [
    {
      title: "Política",
      url: "#",
      icon: Vote,
      isActive: true,
      items: [
        {
          title: "Presidente",
          url: "/",
        },
      ],
    },
    {
      title: "Histórico",
      url: "#",
      icon: History,
      isActive: false,
      items: [
        {
          title: "Minhas apostas",
          url: "/history",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        Betting
        <div className="text-sm text-muted-foreground">
          Saldo: R$ 100,00 (124324234 sats)
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Login />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
