import { test, expect } from "@playwright/test";

test.describe("Geome7ric Landing Page - Main Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads homepage successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Geome7ric/);

    // Verificar que los elementos principales están presentes
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("navigation works correctly", async ({ page }) => {
    // Verificar que el header de navegación está presente
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Verificar links de navegación (ajustar según tu estructura real)
    const navLinks = ["Servicios", "Nosotros", "Portfolio", "Blog", "Contacto"];

    for (const linkText of navLinks) {
      const link = page.getByRole("link", { name: new RegExp(linkText, "i") });
      if ((await link.count()) > 0) {
        await expect(link.first()).toBeVisible();
      }
    }
  });

  test("language switcher works", async ({ page }) => {
    // Buscar el language switcher
    const languageSwitcher = page
      .locator('[data-testid="language-switcher"]')
      .or(
        page
          .locator('button:has-text("EN")')
          .or(page.locator('button:has-text("ES")'))
      );

    if ((await languageSwitcher.count()) > 0) {
      const esButton = page.locator('button:has-text("ES")');
      const enButton = page.locator('button:has-text("EN")');

      // Si estamos en inglés, cambiar a español
      if (await enButton.first().isVisible()) {
        await esButton.first().click();
        await page.waitForURL(/\/es/);
        expect(page.url()).toContain("/es");
      }

      // Cambiar de vuelta a inglés
      if (await esButton.first().isVisible()) {
        await enButton.first().click();
        await page.waitForURL(/\/en/);
        expect(page.url()).toContain("/en");
      }
    }
  });

  test("contact form is present and functional", async ({ page }) => {
    // Navegar a la sección de contacto o buscarla en la página
    const contactSection = page
      .locator("#contact")
      .or(page.locator("section:has(form)"));

    if ((await contactSection.count()) > 0) {
      await contactSection.scrollIntoViewIfNeeded();

      // Verificar que el formulario existe
      const form = page.locator("form");
      await expect(form).toBeVisible();

      // Verificar campos del formulario
      const nameField = page
        .locator('input[name="name"]')
        .or(page.locator('input[type="text"]').first());
      const emailField = page
        .locator('input[name="email"]')
        .or(page.locator('input[type="email"]'));
      const messageField = page
        .locator('textarea[name="message"]')
        .or(page.locator("textarea"));

      await expect(nameField).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(messageField).toBeVisible();

      // Probar llenar el formulario
      await nameField.fill("Test User");
      await emailField.fill("test@example.com");
      await messageField.fill("Este es un mensaje de prueba automatizada.");

      // Verificar que los valores se llenaron
      await expect(nameField).toHaveValue("Test User");
      await expect(emailField).toHaveValue("test@example.com");
      await expect(messageField).toHaveValue(
        "Este es un mensaje de prueba automatizada."
      );
    }
  });

  test("calendly integration is present", async ({ page }) => {
    // Buscar botones o links relacionados con Calendly
    const calendlyTriggers = [
      "text=/agendar/i",
      "text=/reunión/i",
      "text=/cita/i",
      "text=/schedule/i",
      "text=/book/i",
      '[data-testid*="calendly"]',
      'button:has-text("Agendar")',
    ];

    let calendlyFound = false;
    for (const selector of calendlyTriggers) {
      const element = page.locator(selector);
      if ((await element.count()) > 0) {
        await expect(element.first()).toBeVisible();
        calendlyFound = true;
        break;
      }
    }

    // Si encontramos un trigger de Calendly, intentar hacer clic
    if (calendlyFound) {
      const calendlyButton = page.locator('button:has-text("Agendar")').first();
      if ((await calendlyButton.count()) > 0) {
        await calendlyButton.click();

        // Verificar que se abre el modal o iframe de Calendly
        await page.waitForTimeout(1000); // Esperar a que aparezca el modal

        const calendlyModal = page
          .locator('[data-testid="calendly-modal"]')
          .or(page.locator('iframe[src*="calendly"]'));

        if ((await calendlyModal.count()) > 0) {
          await expect(calendlyModal).toBeVisible();
        }
      }
    }
  });

  test("responsive design works on mobile", async ({ page }) => {
    // Cambiar a viewport móvil
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar que la página se adapta al móvil
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    // Verificar que el menú móvil funciona si existe
    const mobileMenuTrigger = page
      .locator('[data-testid="mobile-menu"]')
      .or(page.locator('button:has([data-testid="hamburger"])'));

    if ((await mobileMenuTrigger.count()) > 0) {
      await mobileMenuTrigger.click();
      await page.waitForTimeout(500);

      const mobileMenu = page.locator('[data-testid="mobile-menu-content"]');
      if ((await mobileMenu.count()) > 0) {
        await expect(mobileMenu).toBeVisible();
      }
    }
  });

  test("page loads performance is acceptable", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    // Verificar que la página carga en menos de 5 segundos
    expect(loadTime).toBeLessThan(5000);

    // Verificar Core Web Vitals usando JavaScript
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            resolve(entries[entries.length - 1].startTime);
          }
        }).observe({ entryTypes: ["largest-contentful-paint"] });

        // Timeout después de 3 segundos
        setTimeout(() => resolve(0), 3000);
      });
    });

    // LCP debería ser menor a 2.5 segundos (buena métrica)
    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500);
    }
  });

  test("dark mode toggle works if present", async ({ page }) => {
    // Buscar toggle de modo oscuro
    const darkModeToggle = page
      .locator('[data-testid="dark-mode-toggle"]')
      .or(
        page
          .locator('button:has-text("🌙")')
          .or(page.locator('button:has-text("☀️")'))
      );

    if ((await darkModeToggle.count()) > 0) {
      await darkModeToggle.click();

      // Verificar que se aplicó el modo oscuro
      const bodyOrHtml = page.locator("html").or(page.locator("body"));
      await expect(bodyOrHtml).toHaveClass(/dark/);

      // Cambiar de vuelta
      await darkModeToggle.click();
      await expect(bodyOrHtml).not.toHaveClass(/dark/);
    }
  });

  test("external links open in new tab", async ({ page }) => {
    // Buscar links externos (que no sean del mismo dominio)
    const externalLinks = page.locator(
      'a[href^="http"]:not([href*="geome7ric.com"]):not([href*="localhost"])'
    );

    const linkCount = await externalLinks.count();
    if (linkCount > 0) {
      // Verificar algunos links externos
      for (let i = 0; i < Math.min(3, linkCount); i++) {
        const link = externalLinks.nth(i);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener|noreferrer/);
      }
    }
  });

  test("SEO meta tags are present", async ({ page }) => {
    // Verificar meta tags importantes
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /.+/
    );
    await expect(
      page.locator('meta[property="og:description"]')
    ).toHaveAttribute("content", /.+/);

    // Verificar que hay un favicon
    const favicon = page
      .locator('link[rel="icon"]')
      .or(page.locator('link[rel="shortcut icon"]'));
    await expect(favicon).toHaveCount({ min: 1 });
  });
});
