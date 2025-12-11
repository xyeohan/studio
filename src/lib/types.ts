export type MbtiType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFP'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFJ';

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface BigFiveTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
  imageHint: string;
  mbti: MbtiType;
  zodiac: ZodiacSign;
  bigFive: BigFiveTraits;
  customTraits: string[];
  compatibility?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  messages: Message[];
}
