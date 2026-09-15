import type { CategoryId } from "@/data/rights";

export interface ToneStyle {
  text: string;
  bg: string;
  border: string;
  chip: string;
}

export const tones: Record<string, ToneStyle> = {
  brand: {
    text: "text-brand",
    bg: "bg-brand-soft",
    border: "border-brand/15",
    chip: "bg-brand-soft text-brand",
  },
  turquoise: {
    text: "text-turquoise",
    bg: "bg-turquoise-soft",
    border: "border-turquoise/15",
    chip: "bg-turquoise-soft text-turquoise",
  },
  purple: {
    text: "text-purple",
    bg: "bg-purple-soft",
    border: "border-purple/15",
    chip: "bg-purple-soft text-purple",
  },
  green: {
    text: "text-green",
    bg: "bg-green-soft",
    border: "border-green/15",
    chip: "bg-green-soft text-green",
  },
  pink: {
    text: "text-pink",
    bg: "bg-pink-soft",
    border: "border-pink/15",
    chip: "bg-pink-soft text-pink",
  },
  rose: {
    text: "text-rose",
    bg: "bg-rose-soft",
    border: "border-rose/15",
    chip: "bg-rose-soft text-rose",
  },
  orange: {
    text: "text-orange",
    bg: "bg-orange-soft",
    border: "border-orange/15",
    chip: "bg-orange-soft text-orange",
  },
};

export const categoryTone: Record<CategoryId, string> = {
  work: "turquoise",
  leave: "green",
  studies: "purple",
  benefits: "pink",
  family: "rose",
  ending: "orange",
};

export const toneFor = (category: CategoryId): ToneStyle =>
  tones[categoryTone[category]] ?? tones["brand"]!;
