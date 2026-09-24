import { en } from "./en";
import { ar } from "./ar";
import type {
  Dictionary,
  Locale,
  CaseExample,
  Testimonial,
  TeamMemberDetail,
  PracticeArea,
} from "./types";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  ar,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type {
  Dictionary,
  Locale,
  CaseExample,
  Testimonial,
  TeamMemberDetail,
  PracticeArea,
};