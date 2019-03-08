import { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  MobileNavProvider,
  TopNav,
  BottomNav,
  MobileNavContent,
  BottomNavItem,
  TopNavContent,
  BottomNavContent,
} from "@/components/app-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import CaptureSolidIcon from "@/assets/icons/solid/capture.svg";
import HomeSolidIcon from "@/assets/icons/solid/home.svg";
import GridSolidIcon from "@/assets/icons/solid/grid.svg";
import PlusSolidIcon from "@/assets/icons/solid/plus.svg";
import UserSolidIcon from "@/assets/icons/solid/user.svg";

import BrandLogo from "@/assets/brand-logo.svg";

type WorkspaceLayoutProps = { children: ReactNode };

// Example: replace with real logic to track active tab if you add routing!
const sidebarTabs = [
  {
    key: "activity",
    icon: HomeSolidIcon,
    label: "Activity",
    href: "#",
  },
  {
    key: "suggest-meal",
    icon: PlusSolidIcon,
    label: "Suggest meal",
    href: "#",
  },
  {
    key: "insight",
    icon: GridSolidIcon,
    label: "Insight",
    href: "#",
  },
  {
    key: "profile",
    icon: UserSolidIcon,
    label: "Profile",
    href: "#",
  },
];

// Hardcoded active tab key for demonstration (first tab - "Activity")
const ACTIVE_TAB_KEY = "activity";

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <MobileNavProvider>
      <TopNav>
        <TopNavContent>
          <BrandLogo className="h-8 w-auto text-primary" />

          <Button type="button">
            <CaptureSolidIcon className="size-5" />
            Snap
          </Button>
        </TopNavContent>
      </TopNav>

      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <MobileNavContent className="fixed inset-0 w-screen h-screen min-w-0 bg-neutral-100 dark:bg-neutral-900">
          <div className="container mx-auto max-w-[580px] relative min-h-full">
            <ScrollArea className="h-screen min-h-0 max-h-screen">
              {/* This wrapper enables vertical scrolling for the page content */}
              <div className="min-h-full pb-32">
                {" "}
                {/* Give space for fab/bottom bar */}
                {children}
              </div>
            </ScrollArea>

            {/* Responsive, absolutely positioned bottom-right button */}
            <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center pointer-events-none max-md:hidden">
              <div className="w-full max-w-[580px] px-4 sm:px-6 flex justify-end pointer-events-auto">
                <Button type="button" size="xl">
                  <CaptureSolidIcon className="size-6" />
                  Snap
                </Button>
              </div>
            </div>
          </div>
        </MobileNavContent>
      </SidebarProvider>

      <BottomNav>
        <BottomNavContent>
          {sidebarTabs
            .filter((tab) => tab.key !== "suggest-meal")
            .map((tab) => {
              const isActive = tab.key === ACTIVE_TAB_KEY;
              return (
                <BottomNavItem key={tab.key} asChild isActive={isActive}>
                  <a href={tab.href}>
                    <tab.icon className="size-7 cursor-pointer" />
                    {/* <span>{tab.label}</span> */}
                  </a>
                </BottomNavItem>
              );
            })}
        </BottomNavContent>
      </BottomNav>
    </MobileNavProvider>
  );
}

function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="ml-4! border-none [&_[data-sidebar=sidebar]]:!bg-transparent [&_[data-sidebar=sidebar]]:!border-none [&_[data-slot=sidebar-container]]:!border-none [&_[data-sidebar=sidebar]]:!border-0 [&_[data-slot=sidebar-container]]:!border-0"
      style={{
        border: "none",
      }}
    >
      <SidebarContent>
        <SidebarHeader>
          <div className="flex justify-center py-6 w-full">
            <BrandLogo className="h-8 w-auto text-primary" />
          </div>
        </SidebarHeader>

        <SidebarGroup className="my-auto">
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {sidebarTabs.map((tab) => {
                const isActive = tab.key === ACTIVE_TAB_KEY;
                return (
                  <SidebarMenuItem key={tab.key} className="">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent transition-colors duration-200",
                        isActive
                          ? "text-black dark:text-white"
                          : "text-neutral-400 dark:text-neutral-600",
                        "hover:text-black dark:hover:text-white focus:text-black dark:focus:text-white active:text-black dark:active:text-white"
                      )}
                    >
                      <a href={tab.href}>
                        <tab.icon className="transition-colors duration-200" />
                        <span className="transition-colors duration-200">
                          {tab.label}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
