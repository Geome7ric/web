// Common types used across the application

export type Locale = "es" | "en";

export type LocalizedString = {
  es: string;
  en: string;
};

export type LocalizedStringArray = {
  es: string[];
  en: string[];
};

export interface ImageAsset {
  src: string;
  alt: LocalizedString;
  caption?: LocalizedString;
  width?: number;
  height?: number;
}

export interface LocalizedImageAsset {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}
