import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

// Mock de useRouter y usePathname
const mockReplace = jest.fn();
const mockStartTransition = jest.fn((fn) => fn());

jest.mock('@/i18n/routing', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  routing: {
    locales: ['en', 'es'],
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: jest.fn(),
}));

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    (useTransition as jest.Mock).mockReturnValue([false, mockStartTransition]);
  });

  it('renders language switcher buttons', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/about');
    
    render(<LanguageSwitcher />);
    
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });

  it('highlights current language (English)', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/about');
    
    render(<LanguageSwitcher />);
    
    const enButton = screen.getByText('EN');
    const esButton = screen.getByText('ES');
    
    expect(enButton).toHaveClass('bg-primary/50');
    expect(esButton).not.toHaveClass('bg-primary/50');
    expect(esButton).toHaveClass('text-gray-400');
  });

  it('highlights current language (Spanish)', () => {
    (usePathname as jest.Mock).mockReturnValue('/es/acerca');
    
    render(<LanguageSwitcher />);
    
    const enButton = screen.getByText('EN');
    const esButton = screen.getByText('ES');
    
    expect(esButton).toHaveClass('bg-primary/50');
    expect(enButton).not.toHaveClass('bg-primary/50');
    expect(enButton).toHaveClass('text-gray-400');
  });

  it('changes language from English to Spanish', async () => {
    (usePathname as jest.Mock).mockReturnValue('/en/about');
    const user = userEvent.setup();
    
    render(<LanguageSwitcher />);
    
    const esButton = screen.getByText('ES');
    await user.click(esButton);
    
    expect(mockStartTransition).toHaveBeenCalledWith(expect.any(Function));
    expect(mockReplace).toHaveBeenCalledWith('/es/about');
  });

  it('changes language from Spanish to English', async () => {
    (usePathname as jest.Mock).mockReturnValue('/es/acerca');
    const user = userEvent.setup();
    
    render(<LanguageSwitcher />);
    
    const enButton = screen.getByText('EN');
    await user.click(enButton);
    
    expect(mockStartTransition).toHaveBeenCalledWith(expect.any(Function));
    expect(mockReplace).toHaveBeenCalledWith('/en/acerca');
  });

  it('does not change language when clicking current language', async () => {
    (usePathname as jest.Mock).mockReturnValue('/en/about');
    const user = userEvent.setup();
    
    render(<LanguageSwitcher />);
    
    const enButton = screen.getByText('EN');
    await user.click(enButton);
    
    expect(mockStartTransition).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('handles root path correctly', async () => {
    (usePathname as jest.Mock).mockReturnValue('/en');
    const user = userEvent.setup();
    
    render(<LanguageSwitcher />);
    
    const esButton = screen.getByText('ES');
    await user.click(esButton);
    
    expect(mockReplace).toHaveBeenCalledWith('/es');
  });

  it('handles nested paths correctly', async () => {
    (usePathname as jest.Mock).mockReturnValue('/en/blog/my-post');
    const user = userEvent.setup();
    
    render(<LanguageSwitcher />);
    
    const esButton = screen.getByText('ES');
    await user.click(esButton);
    
    expect(mockReplace).toHaveBeenCalledWith('/es/blog/my-post');
  });

  it('disables buttons during transition', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/about');
    (useTransition as jest.Mock).mockReturnValue([true, mockStartTransition]); // isPending = true
    
    render(<LanguageSwitcher />);
    
    const enButton = screen.getByText('EN');
    const esButton = screen.getByText('ES');
    
    expect(enButton).toBeDisabled();
    expect(esButton).toBeDisabled();
    expect(enButton).toHaveClass('cursor-not-allowed');
    expect(esButton).toHaveClass('cursor-not-allowed');
  });

  it('correctly identifies current locale from different path formats', () => {
    const testCases = [
      { path: '/en', expected: 'en' },
      { path: '/es', expected: 'es' },
      { path: '/en/', expected: 'en' },
      { path: '/es/', expected: 'es' },
      { path: '/en/about', expected: 'en' },
      { path: '/es/acerca', expected: 'es' },
    ];

    testCases.forEach(({ path, expected }) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      
      const { unmount } = render(<LanguageSwitcher />);
      
      const currentButton = screen.getByText(expected.toUpperCase());
      expect(currentButton).toHaveClass('bg-primary/50');
      
      unmount();
    });
  });

  it('has proper hover styles for non-active buttons', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/about');
    
    render(<LanguageSwitcher />);
    
    const esButton = screen.getByText('ES');
    expect(esButton).toHaveClass('hover:text-gray-500');
    expect(esButton).toHaveClass('dark:hover:text-gray-200');
    expect(esButton).toHaveClass('hover:scale-105');
  });

  it('has proper CSS classes for styling', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/about');
    
    const { container } = render(<LanguageSwitcher />);
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('relative', 'flex', 'items-center');
    expect(wrapper).toHaveClass('border', 'border-dark/15', 'dark:border-accent/15');
    expect(wrapper).toHaveClass('rounded-lg');
  });
});
