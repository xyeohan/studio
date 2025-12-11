
"use client";

import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function AppRootPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        // User is logged in, redirect to the main app
        router.replace('/matches');
      } else {
        // User is not logged in, redirect to onboarding
        router.replace('/onboarding');
      }
    }
  }, [user, isUserLoading, router]);

  // Display a loading indicator while checking auth state
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
