import type { UserProfile, MbtiType, ZodiacSign, Chat } from '@/lib/types';

const mbtiTypes: MbtiType[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFP',
  'ISTP', 'ISFP', 'ESTP', 'ESFJ'
];

const zodiacSigns: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const customTraitsPool: string[] = [
  'Creative', 'Adventurous', 'Homebody', 'Foodie', 'Intellectual',
  'Spiritual', 'Fitness Enthusiast', 'Animal Lover', 'Cinephile',
  'Gamer', 'Musician', 'Artist'
];

const names = [
  'Sophia', 'Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 
  'Ava', 'Elijah', 'Isabella', 'Mateo', 'Mia', 'Lucas'
];

export const mockUsers: UserProfile[] = Array.from({ length: 12 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: names[i],
  age: Math.floor(Math.random() * 15) + 22, // Age between 22 and 36
  imageUrl: `https://picsum.photos/seed/user${i + 1}/400/400`,
  imageHint: 'person portrait',
  mbti: mbtiTypes[i % mbtiTypes.length],
  zodiac: zodiacSigns[i % zodiacSigns.length],
  bigFive: {
    openness: Math.random(),
    conscientiousness: Math.random(),
    extraversion: Math.random(),
    agreeableness: Math.random(),
    neuroticism: Math.random(),
  },
  customTraits: customTraitsPool.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2), // 2 to 4 traits
}));

// A "logged in" user for context
export const currentUser: UserProfile = {
    id: 'current-user',
    name: 'Alex',
    age: 28,
    imageUrl: 'https://picsum.photos/seed/currentuser/400/400',
    imageHint: 'person smiling',
    mbti: 'INFP',
    zodiac: 'Cancer',
    bigFive: {
        openness: 0.8,
        conscientiousness: 0.4,
        extraversion: 0.3,
        agreeableness: 0.7,
        neuroticism: 0.6,
    },
    customTraits: ['Creative', 'Intellectual', 'Animal Lover']
};

export const calculateCompatibility = (user1: UserProfile, user2: UserProfile): number => {
    // Mock compatibility calculation
    const bigFiveDifference =
      Object.keys(user1.bigFive)
        .map(key => Math.abs(user1.bigFive[key as keyof typeof user1.bigFive] - user2.bigFive[key as keyof typeof user2.bigFive]))
        .reduce((sum, diff) => sum + diff, 0) / 5;

    const mbtiScore = user1.mbti === user2.mbti ? 0.3 : 0;
    const traitScore = user1.customTraits.filter(trait => user2.customTraits.includes(trait)).length * 0.1;
    
    const score = (1 - bigFiveDifference) * 0.5 + mbtiScore + traitScore;
    return Math.min(100, Math.round(score * 100));
};

mockUsers.forEach(user => {
    user.compatibility = calculateCompatibility(currentUser, user);
});

export const mockChats: Chat[] = mockUsers.slice(0, 5).map((user, index) => ({
    id: `chat-${index + 1}`,
    userId: user.id,
    userName: user.name,
    userImage: user.imageUrl,
    messages: [
        { id: 'm1', senderId: user.id, receiverId: currentUser.id, text: `Hey Alex! I saw we matched. Your profile is really interesting.`, timestamp: '2024-05-21T10:00:00Z' },
        { id: 'm2', senderId: currentUser.id, receiverId: user.id, text: `Hi ${user.name}! Thanks, likewise! I was intrigued by your ${user.customTraits[0].toLowerCase()} side.`, timestamp: '2024-05-21T10:02:00Z' },
        { id: 'm3', senderId: user.id, receiverId: currentUser.id, text: 'Haha, thanks! It keeps life exciting. What are you up to this week?', timestamp: '2024-05-21T10:05:00Z' },
    ]
}));
