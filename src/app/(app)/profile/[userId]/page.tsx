"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { mockUsers, currentUser } from "@/data/mock";
import { UserProfile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MbtiIcon } from "@/components/icons/MbtiIcon";
import { ZodiacIcon } from "@/components/icons/ZodiacIcon";
import { BarChart, Edit, Heart, MessageCircle, Percent } from "lucide-react";

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const user: UserProfile | undefined = [...mockUsers, currentUser].find(
    (u) => u.id === params.userId
  );

  if (!user) {
    notFound();
  }
  
  const isCurrentUser = user.id === currentUser.id;

  const bigFiveData = [
    { name: "Openness", value: user.bigFive.openness * 100 },
    { name: "Conscientiousness", value: user.bigFive.conscientiousness * 100 },
    { name: "Extraversion", value: user.bigFive.extraversion * 100 },
    { name: "Agreeableness", value: user.bigFive.agreeableness * 100 },
    { name: "Neuroticism", value: user.bigFive.neuroticism * 100 },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden relative">
            <Image
              src={user.imageUrl}
              alt={user.name}
              width={600}
              height={600}
              className="aspect-square object-cover w-full"
            />
            {user.compatibility && !isCurrentUser && (
                <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-primary-foreground rounded-full px-4 py-2 flex items-center gap-1 text-lg font-bold">
                    <Heart className="w-5 h-5"/>
                    <span>{user.compatibility}%</span>
                </div>
            )}
          </Card>

          <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-center gap-4">
                    <div className="flex flex-col items-center">
                        <MbtiIcon type={user.mbti} className="text-lg px-3 py-1.5" />
                        <span className="text-xs text-muted-foreground mt-1">MBTI</span>
                    </div>
                     <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center p-2.5 bg-secondary rounded-md" title={user.zodiac}>
                            <ZodiacIcon sign={user.zodiac} className="w-6 h-6 text-secondary-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">Zodiac</span>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold font-headline">{user.name}, {user.age}</h1>
              <p className="text-lg text-muted-foreground">Astute {user.mbti} • Passionate {user.zodiac}</p>
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
              This is a placeholder bio. In a real application, users would write their own description. {user.name} is known for being {user.customTraits[0].toLowerCase()} and has a deep interest in {user.customTraits[1].toLowerCase()}. They enjoy spending their weekends exploring new places and trying out different hobbies.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-semibold">My Traits</h2>
            <div className="flex flex-wrap gap-2">
              {user.customTraits.map((trait) => (
                <Badge key={trait} variant="secondary" className="text-sm">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
          
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

        </div>
      </div>
    </div>
  );
}
