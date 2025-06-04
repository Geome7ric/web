# Geome7ric Landing

This is a [Next.js](https://nextjs.org) project for Geome7ric's landing page with full testing suite.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project includes comprehensive testing at three levels:

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API routes and service integration
- **E2E Tests**: End-to-end user flow testing with Playwright

For detailed testing status and information, see:

- [TESTING_STATUS.md](./TESTING_STATUS.md) - Overview of all testing
- [E2E_TESTING_GUIDE.md](./E2E_TESTING_GUIDE.md) - Guide for E2E testing

### Running Tests

```bash
# Run unit tests
npm run test:unit

# Run unit tests with coverage
npm run test:unit:coverage

# Run integration tests
npm run test:integration

# Run E2E tests (requires Playwright setup)
npm run test:e2e

# Run E2E tests with UI for debugging
npm run test:e2e:ui

# Run all tests
npm run test:all

# Run CI tests (unit + integration)
npm run test:ci
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
