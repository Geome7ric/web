import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DesktopHeader from '@/components/DesktopHeader'; // Adjust path if necessary
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

// Mock Modal component (and CalendlyModal if it's directly used or part of Modal's typical usage here)
jest.mock('@/components/Modal', () => ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) => 
  isOpen ? <div data-testid="modal-mock">{children}</div> : null
);
jest.mock('@/components/CalendlyModal', () => () => <div data-testid="calendly-modal-mock">CalendlyModal</div>);

// Mock calendlyStore
const mockOpenModal = jest.fn();
jest.mock('@/store/calendlyStore', () => ({
  useCalendlyStore: jest.fn(() => ({
    isModalOpen: false,
    openModal: mockOpenModal,
    closeModal: jest.fn(),
  })),
}));

// Mock next/image
jest.mock('next/image', () => {
  // eslint-disable-next-line @next/next/no-img-element
  return ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
});


describe('DesktopHeader', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockOpenModal.mockClear();
    (jest.requireMock('@/store/calendlyStore') as any).useCalendlyStore.mockImplementation(() => ({
        isModalOpen: false,
        openModal: mockOpenModal,
        closeModal: jest.fn(),
    }));
  });

  test('renders navigation links correctly', () => {
    render(<DesktopHeader />);
    
    // Using translation keys as text due to the mock
    expect(screen.getByRole('link', { name: 'common.navigation.services' })).toHaveAttribute('href', '/#services');
    expect(screen.getByRole('link', { name: 'common.navigation.portfolio' })).toHaveAttribute('href', '/#portfolio');
    expect(screen.getByRole('link', { name: 'common.navigation.blog' })).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('link', { name: 'common.navigation.aboutUs' })).toHaveAttribute('href', '/#about-us');
    // The "Contact" link is actually a button that opens a modal
    expect(screen.getByRole('button', { name: 'common.navigation.contact' })).toBeInTheDocument();
  });

  test('renders the logo', () => {
    render(<DesktopHeader />);
    // Assuming the logo image has a specific alt text or role
    // The alt text might also be a translation key
    expect(screen.getByAltText('Geome7ric logo')).toBeInTheDocument();
  });

  test('renders the LanguageSwitcher', () => {
    render(<DesktopHeader />);
    expect(screen.getByTestId('language-switcher-mock')).toBeInTheDocument();
  });

  test('"Contact" button opens Calendly modal', () => {
    render(<DesktopHeader />);
    
    const contactButton = screen.getByRole('button', { name: 'common.navigation.contact' });
    fireEvent.click(contactButton);
    
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });
});
