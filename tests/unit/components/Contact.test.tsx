import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/components/Contact';
import { sendEmail } from '@/app/api';

// Mock de sendEmail
jest.mock('@/app/api', () => ({
  sendEmail: jest.fn(),
}));

// Mock de useNotyf
const mockNotyf = {
  success: jest.fn(),
  error: jest.fn(),
};

jest.mock('@/app/hooks', () => ({
  useNotyf: () => mockNotyf,
}));

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the contact form with all required fields', () => {
    render(<Contact />);
    
    // Verificar que el título está presente
    expect(screen.getByText('Contact.title.p1')).toBeInTheDocument();
    expect(screen.getByText('Contact.title.p2')).toBeInTheDocument();
    
    // Verificar que los campos del formulario están presentes
    expect(screen.getByLabelText(/common.name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/common.email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/common.subject/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact.form.message/)).toBeInTheDocument();
    
    // Verificar el botón de envío
    expect(screen.getByRole('button', { name: /common.send/ })).toBeInTheDocument();
  });

  it('displays validation for required fields', async () => {
    render(<Contact />);
    
    const submitButton = screen.getByRole('button', { name: /common.send/ });
    
    // Intentar enviar el formulario sin llenar campos requeridos
    await userEvent.click(submitButton);
    
    // Los campos requeridos deben tener el atributo required
    const nameInput = screen.getByLabelText(/common.name/);
    const emailInput = screen.getByLabelText(/common.email/);
    const messageInput = screen.getByLabelText(/Contact.form.message/);
    
    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(messageInput).toHaveAttribute('required');
  });

  it('updates form data when user types', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/common.name/);
    const emailInput = screen.getByLabelText(/common.email/);
    const subjectInput = screen.getByLabelText(/common.subject/);
    const messageInput = screen.getByLabelText(/Contact.form.message/);
    
    // Escribir en los campos
    await user.type(nameInput, 'Juan Pérez');
    await user.type(emailInput, 'juan@example.com');
    await user.type(subjectInput, 'Consulta sobre servicios');
    await user.type(messageInput, 'Hola, me interesa conocer más sobre sus servicios.');
    
    // Verificar que los valores se actualicen
    expect(nameInput).toHaveValue('Juan Pérez');
    expect(emailInput).toHaveValue('juan@example.com');
    expect(subjectInput).toHaveValue('Consulta sobre servicios');
    expect(messageInput).toHaveValue('Hola, me interesa conocer más sobre sus servicios.');
  });

  it('submits form successfully', async () => {
    const user = userEvent.setup();
    (sendEmail as jest.Mock).mockResolvedValue({});
    
    render(<Contact />);
    
    // Llenar el formulario
    await user.type(screen.getByLabelText(/common.name/), 'Juan Pérez');
    await user.type(screen.getByLabelText(/common.email/), 'juan@example.com');
    await user.type(screen.getByLabelText(/common.subject/), 'Consulta');
    await user.type(screen.getByLabelText(/Contact.form.message/), 'Mensaje de prueba');
    
    // Enviar el formulario
    await user.click(screen.getByRole('button', { name: /common.send/ }));
    
    // Verificar que sendEmail fue llamado con los datos correctos
    await waitFor(() => {
      expect(sendEmail).toHaveBeenCalledWith({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        subject: 'Consulta',
        message: 'Mensaje de prueba',
      });
    });
    
    // Verificar que se mostró el mensaje de éxito
    await waitFor(() => {
      expect(mockNotyf.success).toHaveBeenCalledWith('Contact.form.success');
    });
  });

  it('handles form submission error', async () => {
    const user = userEvent.setup();
    (sendEmail as jest.Mock).mockRejectedValue(new Error('Network error'));
    
    render(<Contact />);
    
    // Llenar el formulario
    await user.type(screen.getByLabelText(/common.name/), 'Juan Pérez');
    await user.type(screen.getByLabelText(/common.email/), 'juan@example.com');
    await user.type(screen.getByLabelText(/Contact.form.message/), 'Mensaje de prueba');
    
    // Enviar el formulario
    await user.click(screen.getByRole('button', { name: /common.send/ }));
    
    // Verificar que se mostró el mensaje de error
    await waitFor(() => {
      expect(mockNotyf.error).toHaveBeenCalledWith('Contact.form.error');
    });
  });

  it('shows loading state during form submission', async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    (sendEmail as jest.Mock).mockReturnValue(promise);
    
    render(<Contact />);
    
    // Llenar el formulario
    await user.type(screen.getByLabelText(/common.name/), 'Juan Pérez');
    await user.type(screen.getByLabelText(/common.email/), 'juan@example.com');
    await user.type(screen.getByLabelText(/Contact.form.message/), 'Mensaje de prueba');
    
    // Enviar el formulario
    await user.click(screen.getByRole('button', { name: /common.send/ }));
    
    // Verificar que aparece el estado de carga
    expect(screen.getByText(/common.sending/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('opacity-70', 'cursor-not-allowed');
    
    // Resolver la promesa
    resolvePromise!({});
    
    // Verificar que desaparece el estado de carga
    await waitFor(() => {
      expect(screen.queryByText(/common.sending/)).not.toBeInTheDocument();
      expect(screen.getByRole('button')).not.toHaveClass('opacity-70', 'cursor-not-allowed');
    });
  });

  it('initializes with provided subject and message props', () => {
    const props = {
      subject: 'Consulta inicial',
      message: 'Mensaje predefinido'
    };
    
    render(<Contact {...props} />);
    
    expect(screen.getByLabelText(/common.subject/)).toHaveValue('Consulta inicial');
    expect(screen.getByLabelText(/Contact.form.message/)).toHaveValue('Mensaje predefinido');
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    (sendEmail as jest.Mock).mockResolvedValue({});
    
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/common.name/);
    const emailInput = screen.getByLabelText(/common.email/);
    const subjectInput = screen.getByLabelText(/common.subject/);
    const messageInput = screen.getByLabelText(/Contact.form.message/);
    
    // Llenar el formulario
    await user.type(nameInput, 'Juan Pérez');
    await user.type(emailInput, 'juan@example.com');
    await user.type(subjectInput, 'Consulta');
    await user.type(messageInput, 'Mensaje de prueba');
    
    // Enviar el formulario
    await user.click(screen.getByRole('button', { name: /common.send/ }));
    
    // Verificar que los campos se limpian después del envío exitoso
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(subjectInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
  });

  it('applies custom className', () => {
    const { container } = render(<Contact className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
