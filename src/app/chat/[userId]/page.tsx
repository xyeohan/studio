import { mockChats, currentUser } from "@/data/mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function ChatPage({ params }: { params: { userId: string } }) {
  const chat = mockChats.find((c) => c.userId === params.userId);

  if (!chat) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10">
          <AvatarImage src={chat.userImage} alt={chat.userName} />
          <AvatarFallback>{chat.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <div className="font-bold text-lg font-headline">{chat.userName}</div>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-2",
                message.senderId === currentUser.id ? "justify-end" : "justify-start"
              )}
            >
              {message.senderId !== currentUser.id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={chat.userImage} />
                  <AvatarFallback>{chat.userName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2",
                  message.senderId === currentUser.id
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border rounded-bl-none"
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="relative">
          <Input placeholder="Type your message..." className="pr-12 h-12" />
          <Button type="submit" size="icon" className="absolute top-1.5 right-1.5 h-9 w-9">
            <SendHorizonal className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </>
  );
}
