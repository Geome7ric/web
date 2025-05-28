import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileHeader from '@/components/MobileHeader'; // Adjust path if necessary
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key, // Simple mock, returns the key itself
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

// Mock LanguageSwitcher component
jest.mock('@/components/LanguageSwitcher', () => () => <div data-testid="language-switcher-mock">LanguageSwitcher</div>);

// Mock calendlyStore
const mockOpenModal = jest.fn();
jest.mock('@/store/calendlyStore', () => ({
  useCalendlyStore: jest.fn(() => ({
    isModalOpen: false,
    openModal: mockOpenModal,
    closeModal: jest.fn(),
  })),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const original = jest.requireActual('lucide-react');
  return {
    ...original,
    Menu: (props: any) => <svg data-testid="menu-icon" {...props} />,
    X: (props: any) => <svg data-testid="x-icon" {...props} />,
  };
});

// Mock next/image
jest.mock('next/image', () => {
  // eslint-disable-next-line @next/next/no-img-element
  return ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
});

describe('MobileHeader', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockOpenModal.mockClear();
    (jest.requireMock('@/store/calendlyStore') as any).useCalendlyStore.mockImplementation(() => ({
        isModalOpen: false,
        openModal: mockOpenModal,
        closeModal: jest.fn(),
    }));
  });

  test('renders the logo and hamburger menu button, links initially hidden', () => {
    render(<MobileHeader />);
    
    expect(screen.getByAltText('Geome7ric logo')).toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'common.navigation.openMenu' })).toBeInTheDocument();

    // Check that main navigation links are not immediately visible
    // They are typically inside a container that is hidden
    expect(screen.queryByRole('link', { name: 'common.navigation.services' })).not.toBeVisible();
    expect(screen.queryByRole('link', { name: 'common.navigation.portfolio' })).not.toBeVisible();
    expect(screen.queryByRole('link', { name: 'common.navigation.blog' })).not.toBeVisible();
    expect(screen.queryByRole('link', { name: 'common.navigation.aboutUs' })).not.toBeVisible();
    expect(screen.queryByRole('button', { name: 'common.navigation.contact' })).not.toBeVisible();
  });

  test('toggles navigation menu visibility on hamburger button click', () => {
    render(<MobileHeader />);
    const hamburgerButton = screen.getByRole('button', { name: 'common.navigation.openMenu' });

    // Open menu
    fireEvent.click(hamburgerButton);

    // Assert links are visible
    expect(screen.getByRole('link', { name: 'common.navigation.services' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'common.navigation.portfolio' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'common.navigation.blog' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'common.navigation.aboutUs' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'common.navigation.contact' })).toBeVisible();
    
    // Assert menu icon changed to X icon (or X icon is now present)
    expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument(); // Assuming Menu icon is replaced
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
    // Also check the button's aria-label might change
    expect(screen.getByRole('button', { name: 'common.navigation.closeMenu' })).toBeInTheDocument();


    // Close menu by clicking the X button
    const closeButton = screen.getByRole('button', { name: 'common.navigation.closeMenu' });
    fireEvent.click(closeButton);

    // Assert links are hidden again
    expect(screen.queryByRole('link', { name: 'common.navigation.services' })).not.toBeVisible();
    expect(screen.queryByRole('link', { name: 'common.navigation.portfolio' })).not.toBeVisible();
    // Check for menu icon again
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
  });

  test('navigation links work correctly', () => {
    render(<MobileHeader />);
    const hamburgerButton = screen.getByRole('button', { name: 'common.navigation.openMenu' });
    fireEvent.click(hamburgerButton); // Open menu

    const portfolioLink = screen.getByRole('link', { name: 'common.navigation.portfolio' });
    expect(portfolioLink).toHaveAttribute('href', '/#portfolio'); // Based on DesktopHeader, assuming same for mobile
    fireEvent.click(portfolioLink);
    // Actual navigation is mocked, so we just check the href and that the click doesn't break anything.
    // After click, menu should close
    expect(screen.queryByRole('link', { name: 'common.navigation.portfolio' })).not.toBeVisible();
  });
  
  test('"Contact" button in mobile menu calls openModal', () => {
    render(<MobileHeader />);
    const hamburgerButton = screen.getByRole('button', { name: 'common.navigation.openMenu' });
    fireEvent.click(hamburgerButton); // Open menu

    const contactButton = screen.getByRole('button', { name: 'common.navigation.contact' });
    fireEvent.click(contactButton);
    
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
     // After click, menu should close
    expect(screen.queryByRole('button', { name: 'common.navigation.contact' })).not.toBeVisible();
  });

  test('renders LanguageSwitcher in the mobile menu', () => {
    render(<MobileHeader />);
    const hamburgerButton = screen.getByRole('button', { name: 'common.navigation.openMenu' });
    fireEvent.click(hamburgerButton); // Open menu

    expect(screen.getByTestId('language-switcher-mock')).toBeVisible();
  });
});
