// Setup for integration tests using Node environment
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Use undici for fetch, Request, Response, Headers polyfills
const { fetch, Request, Response, Headers } = require('undici')
global.fetch = fetch
global.Request = Request
global.Response = Response 
global.Headers = Headers

// Mock de EmailSignature
jest.mock('@/components/EmailSignature', () => ({
  getFullEmailSignatureHTML: jest.fn(() => '<div>Email Signature</div>'),
}));
