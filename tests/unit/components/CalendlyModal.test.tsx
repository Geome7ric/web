import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalendlyModal from '@/components/CalendlyModal';
import { useCalendlyStore } from '@/store/calendlyStore';

// Mock de useCalendlyStore
const mockSetUrl = jest.fn();
const mockSetIsEmailSent = jest.fn();

jest.mock('@/store/calendlyStore', () => ({
  useCalendlyStore: jest.fn(),
}));

describe('CalendlyModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCalendlyStore as jest.Mock).mockReturnValue({
      setUrl: mockSetUrl,
      iframeHeight: 600,
      setIsEmailSent: mockSetIsEmailSent,
    });

    // Mock de document.body.style
    Object.defineProperty(document.body, 'style', {
      writable: true,
      value: {
        overflow: '',
      },
    });
  });

  afterEach(() => {
    // Limpiar event listeners
    document.body.style.overflow = 'auto';
  });

  it('does not render when isOpen is false', () => {
    render(
      <CalendlyModal 
        isOpen={false} 
        onClose={jest.fn()} 
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
      />
    );    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('defaultTitle')).toBeInTheDocument();
  });

  it('renders with custom title and subtitle', () => {
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Agendar Reunión"
        subtitle="Selecciona un horario conveniente"
      />
    );

    expect(screen.getByText('Agendar Reunión')).toBeInTheDocument();
    expect(screen.getByText('Selecciona un horario conveniente')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const mockOnClose = jest.fn();
    const user = userEvent.setup();
    
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );

    const closeButton = screen.getByLabelText('closeLabel');
    await user.click(closeButton);

    // Esperar a que termine la animación de cierre
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    }, { timeout: 400 });
  });

  it('closes modal when Escape key is pressed', () => {
    const mockOnClose = jest.fn();
    
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    // Esperar a que termine la animación de cierre
    setTimeout(() => {
      expect(mockOnClose).toHaveBeenCalled();
    }, 400);
  });

  it('closes modal when clicking outside', () => {
    const mockOnClose = jest.fn();
    
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );

    // Simular click fuera del modal
    const backdrop = screen.getByRole('dialog').parentElement;
    fireEvent.mouseDown(backdrop!);

    // Esperar a que termine la animación de cierre
    setTimeout(() => {
      expect(mockOnClose).toHaveBeenCalled();
    }, 400);
  });

  it('does not close when clicking inside the modal', () => {
    const mockOnClose = jest.fn();
    
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );

    const modal = screen.getByRole('dialog');
    fireEvent.mouseDown(modal);

    // No debería cerrar el modal
    setTimeout(() => {
      expect(mockOnClose).not.toHaveBeenCalled();
    }, 100);
  });

  it('renders iframe with correct src', () => {
    const customUrl = 'https://calendly.com/custom-url';
    
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
        url={customUrl}
      />    );

    const iframe = screen.getByTitle('iframeTitle');
    expect(iframe).toHaveAttribute('src', customUrl);
  });

  it('uses default Calendly URL when no url prop is provided', () => {
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
      />    );

    const iframe = screen.getByTitle('iframeTitle');
    expect(iframe).toHaveAttribute('src', 'https://calendly.com/geome7ric/30min');
  });

  it('sets body overflow to hidden when modal opens', () => {
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
      />
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow when modal closes', () => {
    const { rerender } = render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
      />
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <CalendlyModal 
        isOpen={false} 
        onClose={jest.fn()} 
      />
    );

    expect(document.body.style.overflow).toBe('auto');
  });

  it('calls setUrl from store when modal opens', () => {
    const customUrl = 'https://calendly.com/test-url';
    
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
        url={customUrl}
      />
    );

    expect(mockSetUrl).toHaveBeenCalledWith(customUrl);
  });

  it('applies correct CSS classes for animations', () => {
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
      />    );

    // The backdrop is the outer div with role="dialog"
    const backdrop = screen.getByRole('dialog');
    // The modal is the inner div with the scale classes
    const modal = backdrop.querySelector('.bg-white');

    expect(backdrop.className).toContain('opacity-100');
    expect(modal?.className).toContain('scale-100');
  });

  it('handles iframe height from store', () => {
    (useCalendlyStore as jest.Mock).mockReturnValue({
      setUrl: mockSetUrl,
      iframeHeight: 800,
      setIsEmailSent: mockSetIsEmailSent,
    });

    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
      />    );

    // Get the inner modal div that has the height style
    const backdrop = screen.getByRole('dialog');
    const modal = backdrop.querySelector('.bg-white') as HTMLElement;
    expect(modal.style.height).toBe('700px'); // Math.min(800 + 60, 700) = 700px
  });  it('handles iframe onLoad event', () => {
    jest.useFakeTimers();
    const mockOnClose = jest.fn();
    
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );

    const iframe = screen.getByTitle('iframeTitle');
    
    // Simular carga del iframe
    fireEvent.load(iframe);

    // Avanzar 5 segundos (simulación de evento programado)
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockSetIsEmailSent).toHaveBeenCalledWith(true);

    // Avanzar 1 segundo más para el cierre automático
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Avanzar 300ms adicionales para el cierre suave del modal
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockOnClose).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('has proper accessibility attributes', () => {
    render(
      <CalendlyModal 
        isOpen={true} 
        onClose={jest.fn()} 
      />
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });
});
