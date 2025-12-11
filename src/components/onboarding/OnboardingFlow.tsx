
"use client";

import { useState, useRef, useEffect } from "react";
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
import { MbtiType, ZodiacSign, UserProfile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFirebase, useUser } from "@/firebase";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

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

type OnboardingData = Partial<UserProfile>;

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});
  const { auth, firestore } = useFirebase();
  const router = useRouter();

  const updateData = (update: OnboardingData) => {
    setData((prev) => ({ ...prev, ...update }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = async () => {
    try {
      // 1. Create anonymous user
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      if (user) {
        // 2. Prepare data for Firestore
        const finalData: UserProfile = {
          id: user.uid,
          name: data.name || "Anonymous",
          gender: data.gender || "Not specified",
          profilePhotoURL: data.profilePhotoURL,
          bigFiveScores: data.bigFiveScores,
          mbtiType: data.mbtiType,
          zodiacSign: data.zodiacSign,
          customTraits: data.customTraits,
        };

        // 3. Save data to Firestore (non-blocking)
        const userDocRef = doc(firestore, "users", user.uid);
        setDocumentNonBlocking(userDocRef, finalData, { merge: true });
        
        // Let the onAuthStateChanged listener handle the redirect
        // The router.push will be handled by the root page now.
      }
    } catch (error) {
      console.error("Onboarding failed:", error);
      // Handle error, maybe show a toast
    }
  };
  
  const stepComponents = [
    (props) => <StepWelcome {...props} />,
    (props) => <StepUserInfo {...props} data={data} updateData={updateData} />,
    (props) => <StepBigFive {...props} data={data} updateData={updateData} />,
    (props) => <StepMbti {...props} data={data} updateData={updateData} />,
    (props) => <StepZodiacAndTraits {...props} data={data} updateData={updateData} />,
    (props) => <StepFinalizing {...props} />,
  ];


  const CurrentStep = stepComponents[step];
  const progress = ((step + 1) / totalSteps) * 100;

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


const StepUserInfo = ({ onNext, onBack, data, updateData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateData({ profilePhotoURL: event.target?.result as string });
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
             <AvatarImage src={data.profilePhotoURL || undefined} />
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
          <Input id="name" placeholder="Enter your name" value={data.name || ''} onChange={(e) => updateData({ name: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Your Gender</Label>
           <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
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
        <Button onClick={onNext} disabled={!data.name || !data.gender}>Next <ArrowRight /></Button>
      </CardFooter>
    </>
  );
};


const StepBigFive = ({ onNext, onBack, data, updateData }) => {
  const [scores, setScores] = useState(data.bigFiveScores || [0.5, 0.5, 0.5, 0.5, 0.5]);

  const handleSliderChange = (index: number, value: number[]) => {
    const newScores = [...scores];
    newScores[index] = value[0] / 100;
    setScores(newScores);
  };

  const handleNext = () => {
    updateData({ bigFiveScores: scores });
    onNext();
  };

  const traits = [
    { name: "Openness to Experience", labels: ["Practical", "Imaginative"] },
    { name: "Conscientiousness", labels: ["Spontaneous", "Organized"] },
    { name: "Extraversion", labels: ["Reserved", "Outgoing"] },
    { name: "Agreeableness", labels: ["Analytical", "Compassionate"] },
    { name: "Neuroticism", labels: ["Calm", "Sensitive"] },
  ];

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">The Big Five Traits</CardTitle>
        <CardDescription>
          Rate yourself on these five core dimensions of personality.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {traits.map((trait, index) => (
          <div className="space-y-2" key={trait.name}>
            <Label>{trait.name}</Label>
            <Slider 
              defaultValue={[scores[index] * 100]} 
              max={100} 
              step={1} 
              onValueChange={(value) => handleSliderChange(index, value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{trait.labels[0]}</span>
              <span>{trait.labels[1]}</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}><ArrowLeft /> Back</Button>
        <Button onClick={handleNext}>Next <ArrowRight /></Button>
      </CardFooter>
    </>
  );
};


const StepMbti = ({ onNext, onBack, data, updateData }) => (
  <>
    <CardHeader>
      <CardTitle className="text-2xl font-headline">Your Personality Type</CardTitle>
      <CardDescription>
        If you know your Myers-Briggs Type Indicator, select it below. If not, no worries! You can skip this.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Select value={data.mbtiType} onValueChange={(value: MbtiType) => updateData({ mbtiType: value })}>
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

const StepZodiacAndTraits = ({ onNext, onBack, data, updateData }) => {
  const selectedTraits = data.customTraits ? data.customTraits.split(', ') : [];

  const toggleTrait = (trait: string) => {
    const newTraits = selectedTraits.includes(trait)
      ? selectedTraits.filter((t) => t !== trait)
      : [...selectedTraits, trait];
    if (newTraits.length <= 5) {
      updateData({ customTraits: newTraits.join(', ') });
    }
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
          <Select value={data.zodiacSign} onValueChange={(value: ZodiacSign) => updateData({ zodiacSign: value })}>
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
  const [isFinishing, setIsFinishing] = useState(false);
  
  useEffect(() => {
    if (!isFinishing) {
      setIsFinishing(true);
      onFinish();
    }
  }, [onFinish, isFinishing]);

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
