export interface LinkType {
  href: string;
  label: string;
  className?: string;
}

export interface HeaderProps {
  links: LinkType[];
  isDarkMode: boolean;
  isScrolled: boolean;
  pitchUrl: string;
  handlePitchClick: () => void;
}
