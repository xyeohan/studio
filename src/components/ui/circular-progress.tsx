"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
  value?: number;
  strokeWidth?: number;
}

const CircularProgress = React.forwardRef<
  SVGSVGElement,
  CircularProgressProps
>(({ className, value = 0, strokeWidth = 10, ...props }, ref) => {
  const r = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg
      ref={ref}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className={cn("transform -rotate-90", className)}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r={r}
        strokeWidth={strokeWidth}
        className="stroke-secondary"
        fill="transparent"
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="stroke-primary transition-all duration-500 ease-out"
        fill="transparent"
      />
    </svg>
  );
});
CircularProgress.displayName = "CircularProgress";

export { CircularProgress };
