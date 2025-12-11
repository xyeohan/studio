import { mockUsers } from "@/data/mock";
import { ProfileCard } from "@/components/ProfileCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

export default function ExplorePage() {
  // In a real app, you might have pagination here
  const allUsers = [...mockUsers].sort(() => Math.random() - 0.5);

  return (
    <div className="container mx-auto px-0">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-headline font-bold flex items-center gap-2">
                <Users className="w-8 h-8 text-primary"/>
                Explore Profiles
            </h1>
            <p className="text-muted-foreground mt-1">
                Discover everyone on SoulSync.
            </p>
        </div>
        <div className="w-full sm:w-auto">
          <Select defaultValue="recommended">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Show: All</SelectItem>
              <SelectItem value="online">Show: Online Now</SelectItem>
              <SelectItem value="new">Show: New Members</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {allUsers.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
