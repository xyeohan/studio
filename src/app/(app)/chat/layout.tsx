"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockChats } from "@/data/mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-[calc(100vh-57px-2rem)]">
      <Card className="h-full grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
        <div className="flex flex-col border-r">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-headline font-bold flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary"/>
                Conversations
            </h1>
          </div>
          <ScrollArea className="flex-1">
            <nav className="flex flex-col gap-1 p-2">
              {mockChats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/chat/${chat.userId}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground",
                    pathname === `/chat/${chat.userId}` && "bg-accent text-foreground font-semibold"
                  )}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.userImage} alt={chat.userName} />
                    <AvatarFallback>{chat.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <div className="font-medium">{chat.userName}</div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.messages[chat.messages.length - 1].text}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(chat.messages[chat.messages.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
        <div className="flex flex-col h-full">
            {children}
        </div>
      </Card>
    </div>
  );
}
