import { Sparkles } from "lucide-react";

export default function ChatPlaceholderPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-secondary/50 rounded-r-lg">
      <div className="text-center">
        <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold font-headline">Select a conversation</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose someone from the list to continue your chat.
        </p>
      </div>
    </div>
  );
}
