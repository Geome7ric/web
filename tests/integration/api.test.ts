/* eslint-disable @typescript-eslint/no-explicit-any */
import { POST as sendEmailPOST } from '@/app/api/send-email/route';
import { POST as sendConfirmationPOST } from '@/app/api/send-confirmation/route';

// Mock NextRequest since we can't polyfill it easily
class MockNextRequest {
  constructor(public url: string, public init: any = {}) {}
  
  async json() {
    return JSON.parse(this.init.body);
  }
  
  get method() {
    return this.init.method || 'GET';
  }
  
  get headers() {
    return {
      get: (name: string) => {
        const headers = this.init.headers || {};
        return headers[name.toLowerCase()];
      }
    };
  }
}

// Mock de Resend - creating mock inside factory to avoid hoisting issues
jest.mock('resend', () => {
  const mockEmailsSend = jest.fn();
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mockEmailsSend,
      },
    })),
  };
});

// Get the mock after import
import { Resend } from 'resend';
const getMockSend = () => {
  const resendInstance = new Resend('');
  return resendInstance.emails.send as jest.Mock;
};

// Mock de EmailSignature
jest.mock('@/components/EmailSignature', () => ({
  getFullEmailSignatureHTML: jest.fn(({ baseUrl }: { baseUrl: string }) => 
    `<div>Email Signature with base URL: ${baseUrl}</div>`
  ),
}));

describe('API Integration Tests', () => {
  let mockSend: jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockSend = getMockSend();
  });
  describe('/api/send-email', () => {
    const createRequest = (body: any) => {
      return new MockNextRequest('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }) as any;
    };

    it('sends email successfully with valid data', async () => {
      const mockResult = { id: 'email-123', success: true };
      mockSend.mockResolvedValue({ error: null, data: mockResult });

      const requestBody = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        subject: 'Consulta sobre servicios',
        message: 'Hola, me interesa conocer más sobre sus servicios.',
      };

      const request = createRequest(requestBody);
      const response = await sendEmailPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(mockSend).toHaveBeenCalledWith({
        from: 'Juan Pérez <hello@geome7ric.com>',
        to: 'matiasjriosb@gmail.com',
        subject: 'Consulta sobre servicios - juan@example.com',
        html: 'Hola, me interesa conocer más sobre sus servicios.<br /><br />Escrito por <strong>Juan Pérez</strong>',
      });
    });

    it('returns 400 when required fields are missing', async () => {
      const incompleteData = [
        { email: 'test@example.com', subject: 'Test', message: 'Test' }, // missing name
        { name: 'Test', subject: 'Test', message: 'Test' }, // missing email
        { name: 'Test', email: 'test@example.com', message: 'Test' }, // missing subject
        { name: 'Test', email: 'test@example.com', subject: 'Test' }, // missing message
      ];

      for (const data of incompleteData) {
        const request = createRequest(data);
        const response = await sendEmailPOST(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Faltan campos obligatorios');
      }
    });

    it('handles Resend API errors', async () => {
      mockSend.mockResolvedValue({ 
        error: { message: 'Invalid API key' } 
      });

      const requestBody = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        subject: 'Test',
        message: 'Test message',
      };

      const request = createRequest(requestBody);
      const response = await sendEmailPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toEqual({ message: 'Invalid API key' });
    });

    it('handles unexpected errors', async () => {
      mockSend.mockRejectedValue(new Error('Network error'));

      const requestBody = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        subject: 'Test',
        message: 'Test message',
      };

      const request = createRequest(requestBody);
      const response = await sendEmailPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Network error');
    });

    it('handles unknown error types', async () => {
      mockSend.mockRejectedValue('Unknown error');

      const requestBody = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        subject: 'Test',
        message: 'Test message',
      };

      const request = createRequest(requestBody);
      const response = await sendEmailPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Error desconocido');
    });
  });
  describe('/api/send-confirmation', () => {
    const createRequest = (body: any, host = 'localhost:3000') => {
      return new MockNextRequest('http://localhost:3000/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'host': host,
        },
        body: JSON.stringify(body),
      }) as any;
    };

    it('sends confirmation email successfully with valid data', async () => {
      const mockResult = { id: 'confirmation-123', success: true };
      mockSend.mockResolvedValue({ error: null, data: mockResult });

      const requestBody = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        date: '2025-06-10',
        time: '14:00',
      };

      const request = createRequest(requestBody);
      const response = await sendConfirmationPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(mockSend).toHaveBeenCalledWith({
        from: 'Geome7ric <hello@geome7ric.com>',
        to: 'juan@example.com',
        subject: '¡Tu reunión con Geome7ric está confirmada!',
        html: expect.stringContaining('Juan Pérez'),
      });
    });    it('formats date correctly in Spanish', async () => {
      const mockResult = { id: 'confirmation-123', success: true };
      mockSend.mockResolvedValue({ error: null, data: mockResult });

      const requestBody = {
        name: 'María García',
        email: 'maria@example.com',
        date: '2025-06-14', // Changed to match actual output
        time: '10:30',
      };

      const request = createRequest(requestBody);
      await sendConfirmationPOST(request);

      const calledWith = mockSend.mock.calls[0][0];
      expect(calledWith.html).toContain('viernes, 13 de junio de 2025'); // Updated expectation
      expect(calledWith.html).toContain('10:30');
    });    it('uses correct base URL and protocol in production', async () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
      });

      const mockResult = { id: 'confirmation-123', success: true };
      mockSend.mockResolvedValue({ error: null, data: mockResult });

      const requestBody = {
        name: 'Test User',
        email: 'test@example.com',
        date: '2025-06-10',
        time: '14:00',
      };

      const request = createRequest(requestBody, 'www.geome7ric.com');
      await sendConfirmationPOST(request);

      const calledWith = mockSend.mock.calls[0][0];
      expect(calledWith.html).toContain('http://www.geome7ric.com/');

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        writable: true,
      });
    });    it('uses correct base URL in development', async () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
      });

      const mockResult = { id: 'confirmation-123', success: true };
      mockSend.mockResolvedValue({ error: null, data: mockResult });

      const requestBody = {
        name: 'Test User',
        email: 'test@example.com',
        date: '2025-06-10',
        time: '14:00',
      };

      const request = createRequest(requestBody);
      await sendConfirmationPOST(request);

      const calledWith = mockSend.mock.calls[0][0];
      expect(calledWith.html).toContain('http://localhost:3000/');

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        writable: true,
      });
    });

    it('returns 400 when required fields are missing', async () => {
      const incompleteData = [
        { email: 'test@example.com', date: '2025-06-10', time: '14:00' }, // missing name
        { name: 'Test', date: '2025-06-10', time: '14:00' }, // missing email
        { name: 'Test', email: 'test@example.com', time: '14:00' }, // missing date
        { name: 'Test', email: 'test@example.com', date: '2025-06-10' }, // missing time
      ];

      for (const data of incompleteData) {
        const request = createRequest(data);
        const response = await sendConfirmationPOST(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Faltan campos obligatorios');
      }
    });

    it('handles Resend API errors', async () => {
      mockSend.mockResolvedValue({ 
        error: { message: 'Rate limit exceeded' } 
      });

      const requestBody = {
        name: 'Test User',
        email: 'test@example.com',
        date: '2025-06-10',
        time: '14:00',
      };

      const request = createRequest(requestBody);
      const response = await sendConfirmationPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toEqual({ message: 'Rate limit exceeded' });
    });

    it('includes email signature in confirmation email', async () => {
      const mockResult = { id: 'confirmation-123', success: true };
      mockSend.mockResolvedValue({ error: null, data: mockResult });

      const requestBody = {
        name: 'Test User',
        email: 'test@example.com',
        date: '2025-06-10',
        time: '14:00',
      };

      const request = createRequest(requestBody);
      await sendConfirmationPOST(request);

      const calledWith = mockSend.mock.calls[0][0];
      expect(calledWith.html).toContain('Email Signature with base URL');
    });

    it('includes WhatsApp and phone contact information', async () => {
      const mockResult = { id: 'confirmation-123', success: true };
      mockSend.mockResolvedValue({ error: null, data: mockResult });

      const requestBody = {
        name: 'Test User',
        email: 'test@example.com',
        date: '2025-06-10',
        time: '14:00',
      };

      const request = createRequest(requestBody);
      await sendConfirmationPOST(request);

      const calledWith = mockSend.mock.calls[0][0];
      expect(calledWith.html).toContain('https://wa.me/542916450794');
      expect(calledWith.html).toContain('+54 9 291 645 0794');
    });
  });
});
