
"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { UserProfile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MbtiIcon } from "@/components/icons/MbtiIcon";
import { ZodiacIcon } from "@/components/icons/ZodiacIcon";
import { BarChart, Edit, Heart, MessageCircle, Percent } from "lucide-react";
import { useDoc, useFirebase, useMemoFirebase, useUser } from "@/firebase";
import { doc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const { user: authUser, isUserLoading: isAuthUserLoading } = useUser();
  const { firestore } = useFirebase();

  const userProfileRef = useMemoFirebase(() => {
    if (!params.userId) return null;
    return doc(firestore, "users", params.userId);
  }, [firestore, params.userId]);

  const { data: user, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  if (isAuthUserLoading || isProfileLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    notFound();
  }
  
  const isCurrentUser = authUser?.uid === user.id;

  const bigFiveData = user.bigFiveScores ? [
    { name: "Openness", value: user.bigFiveScores[0] * 100 },
    { name: "Conscientiousness", value: user.bigFiveScores[1] * 100 },
    { name: "Extraversion", value: user.bigFiveScores[2] * 100 },
    { name: "Agreeableness", value: user.bigFiveScores[3] * 100 },
    { name: "Neuroticism", value: user.bigFiveScores[4] * 100 },
  ] : [];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden relative">
            <Image
              src={user.profilePhotoURL || "https://picsum.photos/seed/placeholder/600/600"}
              alt={user.name}
              width={600}
              height={600}
              className="aspect-square object-cover w-full"
            />
            {/* Compatibility score display can be added later */}
          </Card>

          <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-center gap-4">
                    {user.mbtiType && (
                      <div className="flex flex-col items-center">
                          <MbtiIcon type={user.mbtiType} className="text-lg px-3 py-1.5" />
                          <span className="text-xs text-muted-foreground mt-1">MBTI</span>
                      </div>
                    )}
                     {user.zodiacSign && (
                      <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center p-2.5 bg-secondary rounded-md" title={user.zodiacSign}>
                              <ZodiacIcon sign={user.zodiacSign} className="w-6 h-6 text-secondary-foreground" />
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">Zodiac</span>
                      </div>
                    )}
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold font-headline">{user.name}</h1>
              <p className="text-lg text-muted-foreground">
                {user.mbtiType && `Astute ${user.mbtiType}`} {user.zodiacSign && `• Passionate ${user.zodiacSign}`}
              </p>
            </div>
            {isCurrentUser ? (
                <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2"/> Edit Profile
                </Button>
            ) : (
                <div className="flex gap-2">
                    <Button><Heart className="w-4 h-4 mr-2"/> Like</Button>
                    <Button variant="outline"><MessageCircle className="w-4 h-4 mr-2"/> Message</Button>
                </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-semibold">About me</h2>
            <p className="text-muted-foreground leading-relaxed">
              {user.customTraits ? `This user is known for being ${user.customTraits.toLowerCase()}.` : "This user hasn't written a bio yet."}
            </p>
          </div>

          {user.customTraits && (
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-semibold">My Traits</h2>
              <div className="flex flex-wrap gap-2">
                {/* Assuming customTraits is a single string, needs parsing if it's more complex */}
                <Badge variant="secondary" className="text-sm">
                  {user.customTraits}
                </Badge>
              </div>
            </div>
          )}
          
          {bigFiveData.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-headline font-semibold mb-4 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-primary"/>
                  Big Five Personality
                </h3>
                <div className="space-y-4">
                  {bigFiveData.map((trait) => (
                    <div key={trait.name} className="grid grid-cols-[150px_1fr_50px] items-center gap-4">
                      <span className="font-medium text-sm">{trait.name}</span>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div
                          className="bg-primary h-3 rounded-full"
                          style={{ width: `${trait.value}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm text-right text-muted-foreground">
                          {Math.round(trait.value)}
                          <Percent className="inline-block w-3 h-3 ml-0.5"/>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-4">
                <Skeleton className="h-10 w-16 rounded-md" />
                <Skeleton className="h-12 w-12 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-6 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-7 w-48 mb-4" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-[150px_1fr_50px] items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
