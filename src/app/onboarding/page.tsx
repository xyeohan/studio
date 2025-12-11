import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { Sparkles } from "lucide-react";

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center justify-center text-center mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-primary w-8 h-8"/>
              <h1 className="text-4xl sm:text-5xl font-headline font-bold text-center">
                SoulSync
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Discover your psychological match.
            </p>
        </div>
        <OnboardingFlow />
      </div>
    </main>
  );
}
