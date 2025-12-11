"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Loader, Sparkles, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MbtiType, ZodiacSign } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mbtiTypes: MbtiType[] = [
  "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFP", "ISTP", "ISFP", "ESTP", "ESFJ",
];

const zodiacSigns: ZodiacSign[] = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra",
  "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const customTraits = [
  "Creative", "Adventurous", "Homebody", "Foodie", "Intellectual", "Spiritual",
  "Fitness Enthusiast", "Animal Lover", "Cinephile", "Gamer", "Musician", "Artist",
];

const totalSteps = 6;

const stepComponents = [
  (props) => <StepWelcome {...props} />,
  (props) => <StepUserInfo {...props} />,
  (props) => <StepBigFive {...props} />,
  (props) => <StepMbti {...props} />,
  (props) => <StepZodiacAndTraits {...props} />,
  (props) => <StepFinalizing {...props} />,
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = () => {
    // In a real app, you would save the user's data here.
    setTimeout(() => {
      router.push("/matches");
    }, 2000);
  };

  const progress = ((step + 1) / totalSteps) * 100;

  const CurrentStep = stepComponents[step];

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <Progress value={progress} className="h-2" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStep onNext={handleNext} onBack={handleBack} onFinish={handleFinish} />
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}

const StepWelcome = ({ onNext }) => (
  <>
    <CardHeader>
      <CardTitle className="text-2xl font-headline">Welcome to SoulSync</CardTitle>
      <CardDescription>
        Ready to discover connections on a deeper level? Let's start by getting to know you. This will only take a few moments.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        We use insights from established psychological frameworks to help you find people you'll genuinely vibe with.
      </p>
    </CardContent>
    <CardFooter>
      <Button onClick={onNext} className="ml-auto">
        Let's Begin <ArrowRight />
      </Button>
    </CardFooter>
  </>
);


const StepUserInfo = ({ onNext, onBack }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Tell Us About You</CardTitle>
        <CardDescription>
          Let's start with the basics. This information will be on your public profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
           <Avatar className="h-24 w-24">
             <AvatarImage src={photo || undefined} />
             <AvatarFallback className="text-3xl">
               <Sparkles />
             </AvatarFallback>
           </Avatar>
           <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            accept="image/*"
            className="hidden"
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Your Gender</Label>
           <Select>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select your gender..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}><ArrowLeft /> Back</Button>
        <Button onClick={onNext}>Next <ArrowRight /></Button>
      </CardFooter>
    </>
  );
};


const StepBigFive = ({ onNext, onBack }) => (
  <>
    <CardHeader>
      <CardTitle className="text-2xl font-headline">The Big Five Traits</CardTitle>
      <CardDescription>
        Rate yourself on these five core dimensions of personality.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-2">
        <Label>Openness to Experience</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>Practical</span><span>Imaginative</span></div>
      </div>
      <div className="space-y-2">
        <Label>Conscientiousness</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>Spontaneous</span><span>Organized</span></div>
      </div>
      <div className="space-y-2">
        <Label>Extraversion</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>Reserved</span><span>Outgoing</span></div>
      </div>
      <div className="space-y-2">
        <Label>Agreeableness</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>Analytical</span><span>Compassionate</span></div>
      </div>
      <div className="space-y-2">
        <Label>Neuroticism</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>Calm</span><span>Sensitive</span></div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={onBack}><ArrowLeft /> Back</Button>
      <Button onClick={onNext}>Next <ArrowRight /></Button>
    </CardFooter>
  </>
);

const StepMbti = ({ onNext, onBack }) => (
  <>
    <CardHeader>
      <CardTitle className="text-2xl font-headline">Your Personality Type</CardTitle>
      <CardDescription>
        If you know your Myers-Briggs Type Indicator, select it below. If not, no worries! We can help you estimate it later.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your MBTI type..." />
        </SelectTrigger>
        <SelectContent>
          {mbtiTypes.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={onBack}><ArrowLeft /> Back</Button>
      <Button onClick={onNext}>Next <ArrowRight /></Button>
    </CardFooter>
  </>
);

const StepZodiacAndTraits = ({ onNext, onBack }) => {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Interests & Identity</CardTitle>
        <CardDescription>
          Tell us a bit more about what makes you, you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Your Zodiac Sign</Label>
          <Select>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select your zodiac sign..." />
            </SelectTrigger>
            <SelectContent>
              {zodiacSigns.map((sign) => (
                <SelectItem key={sign} value={sign}>{sign}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Choose up to 5 traits</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {customTraits.map((trait) => (
              <Badge
                key={trait}
                variant={selectedTraits.includes(trait) ? "default" : "secondary"}
                onClick={() => toggleTrait(trait)}
                className="cursor-pointer"
              >
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}><ArrowLeft /> Back</Button>
        <Button onClick={onNext}>Finish <ArrowRight /></Button>
      </CardFooter>
    </>
  );
};


const StepFinalizing = ({ onFinish }) => {
    useState(() => {
        onFinish();
    });
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-6">
      <Loader className="h-12 w-12 animate-spin text-primary mb-4" />
      <h2 className="text-2xl font-headline mb-2">Syncing Your Soul...</h2>
      <p className="text-muted-foreground">
        We're analyzing your unique psychological profile to curate your matches.
      </p>
    </div>
  );
};
