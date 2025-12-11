import type { ZodiacSign } from "@/lib/types";

const iconMap: Record<ZodiacSign, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
  Aries: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5V2"/><path d="M5 12H2"/><path d="M19 12h3"/><path d="M12 19v3"/><path d="M5 5l2 2"/><path d="M17 5l-2 2"/><path d="M5 19l2-2"/><path d="M17 19l-2-2"/><path d="M9 12a3 3 0 0 1 6 0"/><path d="M9 15h6"/></svg>, // Simplified Aries
  Taurus: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6c-3 0-6 3-6 6v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4c0-3-3-6-6-6z"/><path d="M12 6a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>, // Simplified Taurus
  Gemini: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v18"/><path d="M18 3v18"/><path d="M6 6h12"/><path d="M6 18h12"/></svg>,
  Cancer: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6 6 0 0 1 12 0"/><path d="M6 15a6 6 0 0 0 12 0"/></svg>,
  Leo: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a7 7 0 0 0-7 7v5h14v-5a7 7 0 0 0-7-7z"/><path d="M17 17a2.5 2.5 0 1 1-5 0"/></svg>, // Simplified Leo
  Virgo: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v16"/><path d="M8 4v16"/><path d="M12 4v16"/><path d="M16 12l4 4-4 4"/></svg>,
  Libra: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18h16"/><path d="M4 14h16"/><path d="M6 14l6-10 6 10"/></svg>,
  Scorpio: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v12h4"/><path d="M8 4v12h4"/><path d="M12 4v16"/><path d="M16 12l4 4-4 4"/></svg>, // Same as Virgo for simplicity
  Sagittarius: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5l14 14"/><path d="M9 5h10v10"/></svg>,
  Capricorn: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12V4h8"/><path d="M4 12l6 6h4l6-6"/></svg>,
  Aquarius: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l4 4-4 4"/><path d="M12 8l4 4-4 4"/><path d="M4 15h16"/></svg>, // Simplified Aquarius
  Pisces: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6 6 0 0 1 12 0"/><path d="M6 15a6 6 0 0 0 12 0"/><line x1="6" y1="12" x2="18" y2="12"/></svg>, // Simplified Pisces
};

export const ZodiacIcon = ({ sign, ...props }: { sign: ZodiacSign } & React.SVGProps<SVGSVGElement>) => {
  const IconComponent = iconMap[sign] || iconMap.Aries;
  return <IconComponent {...props} />;
};
