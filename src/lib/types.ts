
export type MbtiType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFP'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFJ';

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

// This represents the data stored in Firestore for a user profile.
export interface UserProfile {
  id: string; // Corresponds to Firebase Auth UID
  name: string;
  gender: string;
  profilePhotoURL?: string;
  bigFiveScores?: number[];
  mbtiType?: MbtiType;
  zodiacSign?: ZodiacSign;
  customTraits?: string;
  // Fields from mock data that are not in the Firestore schema yet
  age?: number;
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
