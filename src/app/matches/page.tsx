import { mockUsers } from "@/data/mock";
import { ProfileCard } from "@/components/ProfileCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart } from "lucide-react";

export default function MatchesPage() {
  const sortedUsers = [...mockUsers].sort(
    (a, b) => (b.compatibility ?? 0) - (a.compatibility ?? 0)
  );

  return (
    <div className="container mx-auto px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-headline font-bold flex items-center gap-2">
                <Heart className="w-8 h-8 text-primary"/>
                Your Matches
            </h1>
            <p className="text-muted-foreground mt-1">
                Profiles curated based on your psychological compatibility.
            </p>
        </div>
        <div className="w-full sm:w-auto">
          <Select defaultValue="compatibility">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compatibility">Sort by: Compatibility</SelectItem>
              <SelectItem value="age">Sort by: Age</SelectItem>
              <SelectItem value="newest">Sort by: Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {sortedUsers.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
