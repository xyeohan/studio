import type { MbtiType } from "@/lib/types";

type MbtiIconProps = {
  type: MbtiType;
  className?: string;
};

const typeColors: Record<MbtiType, { bg: string; text: string }> = {
    // Analysts (NT)
    'INTJ': { bg: 'bg-purple-200', text: 'text-purple-800' },
    'INTP': { bg: 'bg-purple-200', text: 'text-purple-800' },
    'ENTJ': { bg: 'bg-purple-200', text: 'text-purple-800' },
    'ENTP': { bg: 'bg-purple-200', text: 'text-purple-800' },
    // Diplomats (NF)
    'INFJ': { bg: 'bg-green-200', text: 'text-green-800' },
    'INFP': { bg: 'bg-green-200', text: 'text-green-800' },
    'ENFJ': { bg: 'bg-green-200', text: 'text-green-800' },
    'ENFP': { bg: 'bg-green-200', text: 'text-green-800' },
    // Sentinels (SJ)
    'ISTJ': { bg: 'bg-blue-200', text: 'text-blue-800' },
    'ISFJ': { bg: 'bg-blue-200', text: 'text-blue-800' },
    'ESTJ': { bg: 'bg-blue-200', text: 'text-blue-800' },
    'ESFJ': { bg: 'bg-blue-200', text: 'text-blue-800' },
    // Explorers (SP)
    'ISTP': { bg: 'bg-yellow-200', text: 'text-yellow-800' },
    'ISFP': { bg: 'bg-yellow-200', text: 'text-yellow-800' },
    'ESTP': { bg: 'bg-yellow-200', text: 'text-yellow-800' },
    'ESFP': { bg: 'bg-yellow-200', text: 'text-yellow-800' },
};

export const MbtiIcon = ({ type, className }: MbtiIconProps) => {
  const colors = typeColors[type] || { bg: 'bg-gray-200', text: 'text-gray-800' };
  
  return (
    <div
      className={`flex items-center justify-center rounded-md px-2 py-1 text-xs font-bold font-mono ${colors.bg} ${colors.text} ${className}`}
      aria-label={`MBTI Type: ${type}`}
    >
      {type}
    </div>
  );
};
