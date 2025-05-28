describe('Responsive Navigation', () => {
  context('Mobile navigation', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/');
    });

    it('should open menu, navigate and close menu', () => {
      // Check if the mobile menu button (hamburger icon) is visible
      cy.get('button[aria-label="Open navigation menu"]').should('be.visible').click();

      // Verify that the navigation links are now visible
      cy.get('nav[aria-label="Main navigation"] a[href="/en/portfolio"]').should('be.visible');
      cy.get('nav[aria-label="Main navigation"] a[href="/en/blog"]').should('be.visible');

      // Click a navigation link (e.g., a link to "/portfolio")
      cy.get('nav[aria-label="Main navigation"] a[href="/en/portfolio"]').click();

      // Verify that the URL changes to the expected path
      cy.url().should('include', '/portfolio');

      // Verify that the mobile menu is now closed
      // This can be checked by ensuring the hamburger button is present again (if it disappears when menu is open)
      // or by checking that the nav links are no longer visible
      cy.get('nav[aria-label="Main navigation"]').should('not.be.visible');
      // Alternatively, check if the main content of the new page is visible
      cy.get('main').should('be.visible');
    });
  });

  context('Desktop navigation', () => {
    beforeEach(() => {
      cy.viewport('macbook-15');
      cy.visit('/');
    });

    it('should navigate to pages directly', () => {
      // Verify that the desktop navigation links are visible directly
      cy.get('header nav a[href="/en/portfolio"]').should('be.visible');
      cy.get('header nav a[href="/en/blog"]').should('be.visible');

      // Click a navigation link (e.g., a link to "/blog")
      cy.get('header nav a[href="/en/blog"]').click();

      // Verify that the URL changes to the expected path
      cy.url().should('include', '/blog');

      // Verify main content of the new page is visible
      cy.get('main').should('be.visible');
    });
  });
});

describe('Navigation Accessibility', () => {
  context('Keyboard navigation on desktop', () => {
    beforeEach(() => {
      cy.viewport('macbook-15');
      cy.visit('/');
    });

    it('should allow keyboard navigation to links', () => {
      // Get all primary navigation links. This selector might need adjustment.
      // Assuming primary links are direct children of a nav element in the header.
      const navLinksSelectors = [
        'header nav a[href="/en/portfolio"]',
        'header nav a[href="/en/blog"]'
      ];

      // Check portfolio link
      cy.get(navLinksSelectors[0]).focus().type('{enter}');
      cy.url().should('include', '/portfolio');
      cy.go('back'); // Go back to home page for next test

      // Check blog link
      cy.get(navLinksSelectors[1]).focus().type('{enter}');
      cy.url().should('include', '/blog');
    });
  });
});

describe('Loading States', () => {
  it('Displays loading indicator on slow network (if applicable)', () => {
    // This test is a placeholder as many apps don't have global easily queryable loading states
    // or the loading is too fast on localhost.
    // Adjust '/en/portfolio' if your portfolio page has a different route.
    cy.intercept('GET', '/en/portfolio', (req) => {
      req.reply(res => res.delay(1000));
    }).as('portfolioPage');

    cy.visit('/');
    cy.viewport('macbook-15'); // Assuming desktop view for this test

    // Click the navigation link for the portfolio page
    cy.get('header nav a[href="/en/portfolio"]').click();

    // Assert that some form of loading indicator is visible.
    // This is highly application-specific. Example:
    // cy.get('[data-testid="loading-spinner"]').should('be.visible');
    // If no specific loading indicator, we might check if the target page content isn't there yet
    // or if a loading class is applied to the body/main element.
    // For now, we'll just put a placeholder assertion.
    cy.log('Attempting to observe loading state. Specific assertion depends on app implementation.');

    cy.wait('@portfolioPage');
    cy.url().should('include', '/portfolio');

    // Verify the loading indicator is no longer visible (if one was asserted)
    // cy.get('[data-testid="loading-spinner"]').should('not.exist');
    cy.get('main').should('be.visible'); // Ensure main content is loaded
  });
});
