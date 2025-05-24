import { create } from "zustand";

interface CalendlyStore {
  url: string;
  iframeHeight: number;
  isEmailSent: boolean;
  // eslint-disable-next-line no-unused-vars
  setUrl: (url: string) => void;
  // eslint-disable-next-line no-unused-vars
  setIframeHeight: (height: number) => void;
  // eslint-disable-next-line no-unused-vars
  setIsEmailSent: (sent: boolean) => void;
}

export const useCalendlyStore = create<CalendlyStore>((set) => ({
  url: "https://calendly.com/geome7ric/30min",
  iframeHeight: 600,
  isEmailSent: false,
  setUrl: (url: string) => set({ url }),
  setIframeHeight: (height: number) => set({ iframeHeight: height }),
  setIsEmailSent: (sent: boolean) => set({ isEmailSent: sent }),
}));
