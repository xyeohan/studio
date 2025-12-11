import Image from "next/image";
import { UserProfile } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/ui/circular-progress";
import { MbtiIcon } from "./icons/MbtiIcon";
import { ZodiacIcon } from "./icons/ZodiacIcon";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  user: UserProfile;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Link href={`/profile/${user.id}`}>
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="p-0 relative">
        <Image
          src={user.imageUrl}
          alt={user.name}
          width={400}
          height={400}
          className="aspect-square object-cover w-full"
          data-ai-hint={user.imageHint}
        />
        {user.compatibility && (
        <div className="absolute bottom-4 right-4">
          <div className="relative flex items-center justify-center">
            <CircularProgress value={user.compatibility} strokeWidth={6} className="w-16 h-16" />
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white" style={{textShadow: '0 0 5px rgba(0,0,0,0.5)'}}>
                    {user.compatibility}
                </span>
                 <span className="text-xs text-white" style={{textShadow: '0 0 5px rgba(0,0,0,0.5)'}}>
                    Match
                </span>
            </div>
          </div>
        </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="text-xl font-bold font-headline">
          {user.name}, {user.age}
        </h3>
        <div className="flex items-center gap-2 mt-2">
            <MbtiIcon type={user.mbti} />
            <div className="flex items-center justify-center p-1.5 bg-secondary rounded-md" title={user.zodiac}>
                <ZodiacIcon sign={user.zodiac} className="w-4 h-4 text-secondary-foreground" />
            </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {user.customTraits.map((trait) => (
            <Badge key={trait} variant="secondary">
              {trait}
            </Badge>
          ))}
        </div>
      </CardContent>
       <CardFooter className="p-4 pt-0 flex gap-2">
        <Button size="sm" className="w-full">
            <Heart className="w-4 h-4 mr-2"/> Like
        </Button>
        <Button size="sm" variant="outline" className="w-full">
            <MessageCircle className="w-4 h-4 mr-2"/> Message
        </Button>
      </CardFooter>
    </Card>
    </Link>
  );
}
