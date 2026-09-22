import {
  Baby,
  BookOpen,
  Briefcase,
  Bus,
  Calendar,
  Clock,
  DoorOpen,
  Dumbbell,
  FileCheck2,
  Gift,
  GraduationCap,
  Heart,
  Info,
  PartyPopper,
  PiggyBank,
  ShieldCheck,
  Shirt,
  Sparkles,
  Stethoscope,
  Sun,
  Thermometer,
  Timer,
  TrendingUp,
  TreePalm,
  UserCheck,
  Users,
  UsersRound,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '../data/types';

const ICONS: Record<IconName, LucideIcon> = {
  wallet: Wallet,
  clock: Clock,
  calendar: Calendar,
  palm: TreePalm,
  stethoscope: Stethoscope,
  thermometer: Thermometer,
  graduation: GraduationCap,
  fileCheck: FileCheck2,
  userCheck: UserCheck,
  gift: Gift,
  piggy: PiggyBank,
  trending: TrendingUp,
  bus: Bus,
  sun: Sun,
  shirt: Shirt,
  shield: ShieldCheck,
  partyPopper: PartyPopper,
  heart: Heart,
  baby: Baby,
  family: UsersRound,
  briefcase: Briefcase,
  door: DoorOpen,
  timer: Timer,
  users: Users,
  dumbbell: Dumbbell,
  bookOpen: BookOpen,
  info: Info,
  sparkles: Sparkles,
};

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/** אייקון קו פשוט. תמיד דקורטיבי - הטקסט לידו נושא את המשמעות. */
export function Icon({ name, size = 22, strokeWidth = 1.8, className }: IconProps) {
  const Component = ICONS[name] ?? Info;
  return (
    <Component size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />
  );
}
