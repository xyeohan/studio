"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Heart,
  MessageSquare,
  Search,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { UserNav } from "@/components/UserNav";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  }

  // Hide sidebar on onboarding page
  if (pathname === '/onboarding') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/matches" className="flex items-center gap-2 p-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-headline font-bold">SoulSync</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/matches")}
                tooltip="Your best matches"
              >
                <Link href="/matches">
                  <Heart />
                  Matches
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/explore")}
                tooltip="Explore all users"
              >
                <Link href="/explore">
                  <Users />
                  Explore
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/chat")}
                tooltip="Your conversations"
              >
                <Link href="/chat">
                  <MessageSquare />
                  Messages
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/profile/current-user", true)}
                tooltip="Your Profile"
              >
                <Link href="/profile/current-user">
                  <User />
                  My Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="relative flex-1">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <input type="search" placeholder="Search profiles..." className="w-full h-9 pl-8 pr-4 rounded-lg bg-secondary focus:outline-none focus:ring-2 focus:ring-ring "/>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
